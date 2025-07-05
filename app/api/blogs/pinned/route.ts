import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const BLOGS_TABLE = "blogs";


export async function GET(_req: NextRequest) {
  try {
    
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: BLOGS_TABLE,
        FilterExpression: "isPinned = :p",
        ExpressionAttributeValues: { ":p": true },
      })
    );

    return NextResponse.json({
      status: true,
      blogs: data.Items || [],
    });
  } catch (err) {
    console.error("Pinned blog fetch error:", err);
    return NextResponse.json(
      { status: false, error: "Failed to fetch pinned blogs" },
      { status: 500 }
    );
  }
}
