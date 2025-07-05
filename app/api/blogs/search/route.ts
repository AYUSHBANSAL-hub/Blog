import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const BLOGS_TABLE = "blogs";

export async function GET(req: NextRequest) {
  const keyword = new URL(req.url).searchParams.get("search")?.trim();
  if (!keyword)
    return NextResponse.json(
      { status: false, error: "Query param 'keyword' is required" },
      { status: 400 }
    );

  try {
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: BLOGS_TABLE,
        ProjectionExpression: "blog_id, user_id, title, subHeading, content, category, createdAt"
      })
    );

    const kw = keyword.toLowerCase();
    const blogs = (data.Items || []).filter((b: any) =>
      (b.title as string)?.toLowerCase().includes(kw)
    );

    return NextResponse.json({ status: true, blogs });
  } catch (err) {
    console.error("Blog search error:", err);
    return NextResponse.json(
      { status: false, error: "Failed to search blogs" },
      { status: 500 }
    );
  }
}
