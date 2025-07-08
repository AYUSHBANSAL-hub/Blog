import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const BLOG_CATEGORIES_TABLE = "blog_categories";

export async function GET(_req: NextRequest) {
  try {
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: BLOG_CATEGORIES_TABLE,
      })
    );

    return NextResponse.json({
      status: true,
      categories: data.Items || [],
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { status: false, error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
