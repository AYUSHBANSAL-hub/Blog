import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dynamoDb } from "@/lib/dynamodb";

const tableName = "users";
const emailIndex = "email-index";


export async function POST(request:NextRequest) {
  try {
    const { email, password } = await request.json();

    
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    }
   

   
    const userRes = await dynamoDb.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: emailIndex,
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: { ":e": { S: email } },
        Limit: 1,
      }),
    );

    if (!userRes.Items || userRes.Items.length === 0) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const user = unmarshall(userRes.Items[0]);

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

   
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

   
    return NextResponse.json(
      { message: "Login successful!", token },
      { status: 200 },
    );
  } catch (err) {
    console.error("Login error", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
