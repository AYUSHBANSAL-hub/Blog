import { QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const TABLE = "blogs";
const CATEGORY_INDEX = "category-index"; 

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const blogId = params.id;
  if (!blogId)
    return NextResponse.json(
      { status: false, error: "Missing blog id" },
      { status: 400 }
    );

  try {
    const orig = await dynamoDb.send(
      new QueryCommand({
        TableName: TABLE,
        KeyConditionExpression: "blog_id = :bid",
        ExpressionAttributeValues: { ":bid": blogId },
        Limit: 1
      })
    );

    const blog = orig.Items?.[0];
    if (!blog)
      return NextResponse.json(
        { status: false, error: "Blog not found" },
        { status: 404 }
      );

    const cat = blog.category;
    if (!cat)
      return NextResponse.json(
        { status: false, error: "Blog has no category" },
        { status: 400 }
      );

    let related: any[] = [];

    try {
      const rel = await dynamoDb.send(
        new QueryCommand({
          TableName: TABLE,
          IndexName: CATEGORY_INDEX,
          KeyConditionExpression: "category = :c",
          ExpressionAttributeValues: { ":c": cat }
        })
      );
      related = rel.Items || [];
    } catch {
      
      const rel = await dynamoDb.send(
        new ScanCommand({
          TableName: TABLE,
          FilterExpression: "category = :c",
          ExpressionAttributeValues: { ":c": cat }
        })
      );
      related = rel.Items || [];
    }

    
    related = related.filter((b) => b.blog_id !== blogId);

    return NextResponse.json({ status: true, related });
  } catch (err) {
    console.error("Related fetch error:", err);
    return NextResponse.json(
      { status: false, error: "Failed to fetch related blogs" },
      { status: 500 }
    );
  }
}
