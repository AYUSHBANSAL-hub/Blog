import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "@/lib/s3";


const BUCKET_NAME = process.env.S3_BUCKET_NAME

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const newUsername = formData.get("username") as string | null;
    const newLocation = formData.get("location") as string | null;
    const newLink = formData.get("link") as string | null;
    const newAbout = formData.get("about") as string | null;
    const profileImage = formData.get("profile_image") as File | null;

    if (!email) {
      return NextResponse.json(
        { status: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // 1. Find user_id from users table
    const userResult = await dynamoDb.send(
      new QueryCommand({
        TableName: "users",
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: {
          ":e": email,
        },
      })
    );

    const user = userResult.Items?.[0];
    if (!user) {
      return NextResponse.json(
        { status: false, error: "User not found with that email" },
        { status: 404 }
      );
    }
    const user_id = user.user_id;

    // 2. Fetch existing user_details by user_id (primary key)
    const existingResult = await dynamoDb.send(
      new GetCommand({
        TableName: "user_details",
        Key: { user_id },
      })
    );

     const existingDetails = existingResult.Item;
    const existingUsername = existingDetails?.username;


    // 3. If new username is different, check if it's taken by another user
    if (
      newUsername &&
      newUsername !== existingUsername
    ) {
      const usernameCheck = await dynamoDb.send(
        new QueryCommand({
          TableName: "user_details",
          IndexName: "username-index",
          KeyConditionExpression: "username = :u",
          ExpressionAttributeValues: {
            ":u": newUsername,
          },
        })
      );

      if (usernameCheck.Count && usernameCheck.Items?.[0]?.email !== email) {
        return NextResponse.json(
          { status: false, error: "Username already taken" },
          { status: 409 }
        );
      }
    }

    // 4. Upload image to S3 if provided
    let profileImageUrl = existingDetails?.profile_image || "";
    if (profileImage instanceof File) {
      const bytes = await profileImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = profileImage.name.split(".").pop();
      const key = `profile_images/${uuidv4()}.${ext}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
          Body: buffer,
          ContentType: profileImage.type,
        })
      );

      profileImageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;
    }

    // 5. Build updated item
    const updatedItem = {
      user_id,
      email,
      username: newUsername ?? existingDetails?.username ?? "",
      location: newLocation ?? existingDetails?.location ?? "",
      link: newLink ?? existingDetails?.link ?? "",
      about: newAbout ?? existingDetails?.about ?? "",
      profile_image: profileImageUrl,
      createdAt: existingDetails?.createdAt ?? new Date().toISOString(),
    };

    // 6. Update user_details table
    await dynamoDb.send(
      new PutCommand({
        TableName: "user_details",
        Item: updatedItem,
      })
    );

    return NextResponse.json({
      status: true,
      message: "User details updated",
      item: {...updatedItem , ...user},
    });
  } catch (err) {
    console.error("Error in PUT /userDetails:", err);
    return NextResponse.json(
      { status: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { status: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Step 1: Get user_id from users table using email
    const userQuery = await dynamoDb.send(
      new QueryCommand({
        TableName: "users",
        IndexName: "email-index",
        KeyConditionExpression: "email = :e",
        ExpressionAttributeValues: {
          ":e": email,
        },
      })
    );

    const user = userQuery.Items?.[0];
    if (!user) {
      return NextResponse.json(
        { status: false, error: "User not found" },
        { status: 404 }
      );
    }

    const user_id = user.user_id;

    // Step 2: Get user_details using user_id
    const detailsQuery = await dynamoDb.send(
      new QueryCommand({
        TableName: "user_details",
        IndexName: "user_id-index",
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: {
          ":uid": user_id,
        },
      })
    );

    const details = detailsQuery.Items?.[0];
    if (!details) {
      return NextResponse.json({
      status: true,
      userDetails: {...user},
    });
    }

    return NextResponse.json({
      status: true,
      userDetails: {...details , ...user},
    });
  } catch (err) {
    console.error("Error in GET /user-details:", err);
    return NextResponse.json(
      { status: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}