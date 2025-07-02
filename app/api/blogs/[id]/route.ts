import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const blogsTableName = "blogs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const blogId = params.id;

  if (!blogId) {
    return NextResponse.json({ status: false, error: "Missing blog id" }, { status: 400 });
  }

  try {
    const data = await dynamoDb.send(
      new QueryCommand({
        TableName: blogsTableName,
        KeyConditionExpression: "blog_id = :id",
        ExpressionAttributeValues: {
          ":id": blogId,
        },
        Limit: 1,
      })
    );

    const blog = data.Items?.[0];

    if (!blog) {
      return NextResponse.json({ status: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ status: true, blog });
  } catch {
    return NextResponse.json({ status: false, error: "Failed to fetch blog" }, { status: 500 });
  }
}
