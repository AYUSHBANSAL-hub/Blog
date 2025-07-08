import { QueryCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const BLOGS_TABLE = "blogs";
const SUBCATEGORIES_TABLE = "blog_subcategories";
const CATEGORIES_TABLE = "blog_categories";

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const categoryId = params.categoryId;

  if (!categoryId) {
    return NextResponse.json(
      { status: false, error: "Category ID is required" },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch blogs with matching category_id
    const blogsResult = await dynamoDb.send(
      new QueryCommand({
        TableName: BLOGS_TABLE,
        IndexName: "category-index", 
        KeyConditionExpression: "category = :catId",
        ExpressionAttributeValues: {
          ":catId": categoryId,
        },
      })
    );

    // 2. Fetch subcategories for the category_id
    const subcategoriesResult = await dynamoDb.send(
      new QueryCommand({
        TableName: SUBCATEGORIES_TABLE,
        IndexName: "category_id-index", 
        KeyConditionExpression: "category_id = :catId",
        ExpressionAttributeValues: {
          ":catId": categoryId,
        },
      })
    );

    // 3. Fetch category_name from blog_categories table
    const categoryResult = await dynamoDb.send(
      new GetCommand({
        TableName: CATEGORIES_TABLE,
        Key: { category_id: categoryId },
      })
    );

    const categoryName = categoryResult.Item?.category_name || "Unknown";

    // 4. Add category_name to each blog
    const blogsWithCategoryName = (blogsResult.Items || []).map((blog) => ({
      ...blog,
      category_name: categoryName,
    }));

    return NextResponse.json({
      status: true,
      blogs: blogsWithCategoryName,
      subcategories: subcategoriesResult.Items || [],
    });
  } catch (error) {
    console.error("Error fetching category details:", error);
    return NextResponse.json(
      { status: false, error: "Failed to fetch category data" },
      { status: 500 }
    );
  }
}
