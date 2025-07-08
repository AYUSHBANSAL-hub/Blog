import { ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const BLOGS_TABLE = "blogs";
const CATEGORY_TABLE = "blog_categories";

export async function GET(_req: NextRequest) {
  try {
    // Step 1: Fetch all pinned blogs
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: BLOGS_TABLE,
        FilterExpression: "isPinned = :p",
        ExpressionAttributeValues: { ":p": true },
      })
    );

    const blogs = data.Items || [];

    // Step 2: Extract unique category IDs
    const categoryIds = Array.from(new Set(blogs.map((blog) => blog.category)));

    // Step 3: Fetch all category names in parallel
    const categoryMap: Record<string, string> = {};
    await Promise.all(
      categoryIds.map(async (categoryId) => {
        try {
          const res = await dynamoDb.send(
            new GetCommand({
              TableName: CATEGORY_TABLE,
              Key: { category_id: categoryId },
            })
          );
          if (res.Item?.category_name) {
            categoryMap[categoryId] = res.Item.category_name;
          }
        } catch (err) {
          console.error(`Error fetching category for ID ${categoryId}:`, err);
        }
      })
    );

    // Step 4: Enrich each blog with its category name
    const enrichedBlogs = blogs.map((blog) => ({
      ...blog,
      category_name: categoryMap[blog.category] || "Unknown",
    }));

    return NextResponse.json({
      status: true,
      blogs: enrichedBlogs,
    });
  } catch (err) {
    console.error("Pinned blog fetch error:", err);
    return NextResponse.json(
      { status: false, error: "Failed to fetch pinned blogs" },
      { status: 500 }
    );
  }
}
