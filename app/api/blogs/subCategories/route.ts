import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const SUBCATEGORIES_TABLE = "blog_subcategories";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const categoryId = url.searchParams.get("categoryId");

  if (!categoryId) {
    return NextResponse.json(
      { status: false, error: "Missing category_id in query" },
      { status: 400 }
    );
  }

  try {
    const result = await dynamoDb.send(
      new ScanCommand({
        TableName: SUBCATEGORIES_TABLE,
        FilterExpression: "category_id = :cid",
        ExpressionAttributeValues: {
          ":cid": categoryId,
        },
      })
    );

    const subcategories = result.Items || [];

    return NextResponse.json({
      status: true,
      category_id: categoryId,
      subcategories,
    });
  } catch (error: any) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { status: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
