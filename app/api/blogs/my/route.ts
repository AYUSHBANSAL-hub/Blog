import { QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const usersTable = "users";
const blogsTable = "blogs";
const categoriesTable = "blog_categories";
const emailIndex = "email-index";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json(
        { status: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Find the user by email
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
      return NextResponse.json(
        { status: false, error: "User not found" },
        { status: 404 }
      );
    }

    const userId = user.user_id;

    // 2. Query blogs by user_id
    const blogRes = await dynamoDb.send(
      new QueryCommand({
        TableName: blogsTable,
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: { ":uid": userId },
      })
    );

    const blogs = blogRes.Items || [];

    // 3. Extract unique category IDs
    const categoryIds = Array.from(new Set(blogs.map((b) => b.category)));

    // 4. Fetch category names in parallel
    const categoryMap: Record<string, string> = {};
    await Promise.all(
      categoryIds.map(async (id) => {
        try {
          const res = await dynamoDb.send(
            new GetCommand({
              TableName: categoriesTable,
              Key: { category_id: id },
            })
          );
          if (res.Item?.category_name) {
            categoryMap[id] = res.Item.category_name;
          }
        } catch (e) {
          console.error(`Error fetching category for id ${id}`, e);
        }
      })
    );

    // 5. Add category_name to each blog
    const enrichedBlogs = blogs.map((blog) => ({
      ...blog,
      category_name: categoryMap[blog.category] || "Unknown",
    }));

    return NextResponse.json({ status: true, blogs: enrichedBlogs });
  } catch (err: any) {
    return NextResponse.json(
      { status: false, error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
