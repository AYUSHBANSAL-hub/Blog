import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const usersTable = "users";
const blogsTable = "blogs";
const emailIndex = "email-index";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;
    if (!email) {
      return NextResponse.json({ status: false, error: "Email is required" }, { status: 400 });
    }

      const userRes = await dynamoDb.send(
      new QueryCommand({
        TableName: usersTable,
        IndexName: emailIndex,
        KeyConditionExpression: "#e = :emailVal",
        ExpressionAttributeNames: { "#e": "email" },
        ExpressionAttributeValues: { ":emailVal": email },
        Limit: 1,
      })
    );

    const user = userRes.Items?.[0];
    if (!user) {
      return NextResponse.json({ status: false, error: "User not found" }, { status: 404 });
    }

    const userId = user.user_id;

    
    const blogRes = await dynamoDb.send(
      new QueryCommand({
        TableName: blogsTable,
        IndexName: "user_id-index", 
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: { ":uid": userId },
      })
    );

    const blogs = blogRes.Items || [];

    return NextResponse.json({ status: true, blogs });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
