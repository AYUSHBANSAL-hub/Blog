import { NextRequest, NextResponse } from "next/server";
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { dynamoDb } from "@/lib/dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";


export async function POST(request:NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, fullName, password } = body;

    
    if (!email || !phone || !fullName || !password) {
      return NextResponse.json(
        { error: "All fields (email, phone, fullName, password) are required." },
        { status: 400 },
      );
    }
    
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long." },
        { status: 400 },
      );
    }

    // 2️⃣ Uniqueness checks (GSIs) ------------------------------------------
    const tableName = "users";
    const emailIndex = "email-index";
    const phoneIndex = "phone-index";

    // Email GSI
    const emailQuery = await dynamoDb.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: emailIndex,
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": { S: email } },
        ProjectionExpression: "email",
        Limit: 1,
      }),
    );
    if (emailQuery.Count && emailQuery.Count > 0) {
      return NextResponse.json({ error: "Email already in use." }, { status: 400 });
    }

    // Phone GSI
    const phoneQuery = await dynamoDb.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: phoneIndex,
        KeyConditionExpression: "phone = :p",
        ExpressionAttributeValues: { ":p": { S: phone } },
        ProjectionExpression: "phone",
        Limit: 1,
      }),
    );
    if (phoneQuery.Count && phoneQuery.Count > 0) {
      return NextResponse.json({ error: "Phone number already in use." }, { status: 400 });
    }

    // 3️⃣ Hash password ------------------------------------------------------
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4️⃣ Generate user ID ---------------------------------------------------
    const userId = randomUUID();

    // 5️⃣ Persist to DynamoDB -----------------------------------------------
     const userItem = {
      user_id: userId,
      email,
      phone,
      fullName,
      role:"user",
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    await dynamoDb.send(
      new PutItemCommand({
        TableName: tableName,
        Item: marshall(userItem),
        ConditionExpression: "attribute_not_exists(user_id)",
      }),
    );

    // 6️⃣ Success response ---------------------------------------------------
    return NextResponse.json(
      { message: "Signup successful!", user_id: userId },
      { status: 201 },
    );
  } catch (err) {
    console.error("Signup error", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
