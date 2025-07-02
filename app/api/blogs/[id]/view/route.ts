
import { QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const table = "blogs";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const blogId = params.id;
  if (!blogId) return NextResponse.json({ status: false, error: "Missing blog id" }, { status: 400 });

  try {
    const q = await dynamoDb.send(
      new QueryCommand({
        TableName: table,
        KeyConditionExpression: "blog_id = :id",
        ExpressionAttributeValues: { ":id": blogId },
        Limit: 1
      })
    );

    const blog = q.Items?.[0] as { user_id?: string };
    if (!blog?.user_id) return NextResponse.json({ status: false, error: "Blog not found" }, { status: 404 });

    const u = await dynamoDb.send(
      new UpdateCommand({
        TableName: table,
        Key: { blog_id: blogId, user_id: blog.user_id },
        UpdateExpression: "ADD #v :inc",
        ExpressionAttributeNames: { "#v": "views" },
        ExpressionAttributeValues: { ":inc": 1 },
        ConditionExpression: "attribute_exists(blog_id)",
        ReturnValues: "UPDATED_NEW"
      })
    );

    return NextResponse.json({ status: true, views: (u.Attributes as any)?.views });
  } catch {
    return NextResponse.json({ status: false, error: "Failed to update views" }, { status: 500 });
  }
}
