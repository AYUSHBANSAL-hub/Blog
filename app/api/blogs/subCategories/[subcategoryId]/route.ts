import { NextResponse } from "next/server";
import { GetItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

export async function GET(
  _req: Request,
  context: { params: { subcategoryId: string } }
) {
  try {
    const subcategoryId = context.params.subcategoryId;
    console.log("Fetching blogs for subcategory:", subcategoryId);

    if (!subcategoryId) {
      return NextResponse.json(
        { status: false, error: "subcategoryId is required" },
        { status: 400 }
      );
    }

    // 1. Query blogs by subCategory
    const blogQueryParams = {
      TableName: "blogs",
      IndexName: "subCategory-index",
      KeyConditionExpression: "subCategory = :sub",
      ExpressionAttributeValues: {
        ":sub": { S: subcategoryId },
      },
    };

    const blogCommand = new QueryCommand(blogQueryParams);
    const blogData = await dynamoDb.send(blogCommand);
    const blogs = blogData.Items?.map((item) => unmarshall(item)) || [];
    console.log("Blogs fetched:", blogs);
    const categoryId = blogs.length > 0 ? blogs[0].category : null; 

    // 2. Get subcategory_name from blog_subcategory table
    const subcategoryCommand = new GetItemCommand({
      TableName: "blog_subcategories",
      Key: {
        category_id: { S: categoryId || "" }, // Use empty string if categoryId is null
        subcategory_id: { S: subcategoryId },
      },
    });

    const subcategoryData = await dynamoDb.send(subcategoryCommand);
    const subcategoryName =
      subcategoryData.Item && unmarshall(subcategoryData.Item).subcategory_name;

    return NextResponse.json({
      status: true,
      subcategory_name: subcategoryName || null,
      blogs,
    });
  } catch (err) {
    console.error("Failed to fetch blogs by subcategory", err);
    return NextResponse.json(
      { status: false, error: "Server error" },
      { status: 500 }
    );
  }
}
