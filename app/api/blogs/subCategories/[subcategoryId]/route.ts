import { NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { dynamoDb } from "@/lib/dynamodb";

export async function GET(
  _req: Request,
  context: { params: { subcategoryId: string } }
) {
  try {
    const subcategoryId = context.params.subcategoryId;

    if (!subcategoryId) {
      return NextResponse.json(
        { status: false, error: "subcategoryId is required" },
        { status: 400 }
      );
    }

    const params = {
      TableName: "blogs",
      IndexName: "subCategory-index", // Ensure GSI exists
      KeyConditionExpression: "subCategory = :sub",
      ExpressionAttributeValues: {
        ":sub": { S: subcategoryId },
      },
    };

    const command = new QueryCommand(params);
    const data = await dynamoDb.send(command);

    const blogs = data.Items?.map((item) => unmarshall(item)) || [];

    

    return NextResponse.json({ status: true, blogs });
  } catch (err) {
    console.error("Failed to fetch blogs by subcategory", err);
    return NextResponse.json(
      { status: false, error: "Server error" },
      { status: 500 }
    );
  }
}
