import { PutObjectCommand } from "@aws-sdk/client-s3";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { dynamoDb } from "@/lib/dynamodb";
import { s3 } from "@/lib/s3";

const region = process.env.AWS_REGION!;
const blogsTableName = "blogs";
const bucketName = process.env.S3_BUCKET_NAME!;
const usersTableName = "users";
const emailIndex = "email-index";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const subHeading = formData.get("subHeading") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as File | null;
  const email = formData.get("email") as string;
  const raw = formData.get("tags");
  const category = formData.get("category");
  const subCategory = formData.get("subCategory");

  if (!email) {
    return NextResponse.json(
      { error: "User not Authenticated" },
      { status: 400 }
    );
  }

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );   
  }
  
  const result = await dynamoDb.send(
    new QueryCommand({
      TableName : usersTableName,
      IndexName: emailIndex,
     KeyConditionExpression: "#e = :emailVal",
     ExpressionAttributeNames: {
        "#e": "email",
      },
        ExpressionAttributeValues: {
          ":emailVal":  email ,
        },
        Limit: 1,
    })
  );

  const user = result.Items?.[0];

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.user_id;

  const blogId = uuidv4();
  let coverImageUrl: string | null = null;

  // Upload image to S3
  if (coverImage) {
    const buffer = Buffer.from(await coverImage.arrayBuffer());
    const fileExt = coverImage.name.split(".").pop();
    const key = `blogs/${blogId}/cover.${fileExt}`;

    const uploadParams = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: coverImage.type,
    });

    try {
      await s3.send(uploadParams);
      coverImageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    } catch (err) {
      console.error("S3 Upload Error:", err);
      return NextResponse.json(
        { error: "Failed to upload image" },
        { status: 500 }
      );
    }
  }


  // Save blog in DynamoDB
  const blogItem = {
    blog_id: blogId,
    user_id : userId,
    title,
    subHeading,
    tags: JSON.parse(raw as string) as string[] | [],
    category,
    subCategory,
    content,
    coverImageUrl,
    isPinned:false,
    views:0,
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamoDb.send(
      new PutCommand({
        TableName: blogsTableName,
        Item: blogItem,
      })
    );

    return NextResponse.json({
      status: true,
      message: "Blog created",
      blog: blogItem,
    });
  } catch (err) {
    console.error("DynamoDB Error:", err);
    return NextResponse.json(
      { status: false, error: "Failed to save blog" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const limitParam = new URL(req.url).searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;

  try {
    const data = await dynamoDb.send(
      new ScanCommand({
        TableName: blogsTableName
      })
    );

    const items = (data.Items || []) as { views?: number }[];
    items.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
    const result = limit ? items.slice(0, limit) : items;

    return NextResponse.json({ status: true, blogs: result });
  } catch {
    return NextResponse.json(
      { status: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}