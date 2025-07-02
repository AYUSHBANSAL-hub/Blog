import { NextRequest, NextResponse } from "next/server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

const tableName = "users";
const emailIndex = "email-index";



export async function GET(request:NextRequest, { params }: { params: { email: string } }) {
  try {
    
    const encodedEmail = params.email;
    const email = decodeURIComponent(encodedEmail);


    // 2️⃣ Query DynamoDB via EmailIndex
    const data = await dynamoDb.send(
      new QueryCommand({
        TableName: tableName,
        IndexName: emailIndex,
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: {
          ":e": { S: email },
        },
        Limit: 1,
      }),
    );

    if (!data.Items || data.Items.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { password, ...publicFields } = unmarshall(data.Items[0]);

    return NextResponse.json({ user: publicFields }, { status: 200 });
  } catch (err) {
    console.error("Get user error", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
