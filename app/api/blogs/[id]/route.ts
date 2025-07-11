import { DeleteCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextRequest, NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.AWS_REGION;


const blogsTableName = "blogs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const blogId = params.id;
  console.log("Fetching blog with ID:", blogId);

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
    console.log("Blog data:", blog);

    if (!blog) {
      return NextResponse.json({ status: false, error: "Blog not found" }, { status: 404 });
    }

    const userId = blog.user_id;

    if (!userId) {
      return NextResponse.json({ status: false, error: "User ID missing in blog data" }, { status: 500 });
    }

    // 2. Fetch user_details by user_id
    const userDetailsData = await dynamoDb.send(
      new QueryCommand({
        TableName: "user_details",
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: {
          ":uid":  userId ,
        },
        Limit: 1,
      })
    );

    const userDetails = userDetailsData.Items?.[0] || null;

    return NextResponse.json({
      status: true,
      blog,
      user: userDetails,
    });
  } catch (error) {
    console.error("Error in GET /blogs/:id =>", error);
    return NextResponse.json({ status: false, error: "Failed to fetch blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const blogId = params.id;
  if (!blogId) return NextResponse.json({ status: false, error: "Missing blog id" }, { status: 400 });

  const fd = await req.formData();
  const email = fd.get("email") as string | null;
  if (!email) return NextResponse.json({ status: false, error: "Missing email" }, { status: 400 });

  const q = await dynamoDb.send(
    new QueryCommand({
      TableName: "users",
      IndexName: "email-index",
      KeyConditionExpression: "#e = :v",
      ExpressionAttributeNames: { "#e": "email" },
      ExpressionAttributeValues: { ":v": email },
      Limit: 1,
    })
  );
  const user = q.Items?.[0];
  if (!user) return NextResponse.json({ status: false, error: "User not found" }, { status: 404 });
  const userId = user.user_id;

  const title = fd.get("title") as string | null;
  const subHeading = fd.get("subHeading") as string | null;
  const content = fd.get("content") as string | null;
  const category = fd.get("category") as string | null;
  const categoryName = fd.get("categoryName") as string | null; // ✅
  const subCategory = fd.get("subCategory") as string | null;
  const subCategoryName = fd.get("subCategoryName") as string | null; // ✅
  const tagsRaw = fd.get("tags") as string | null;
  const coverImage = fd.get("coverImage") as File | null;

  const updateParts: string[] = [];
  const exprAttrNames: Record<string, string> = {};
  const exprAttrValues: Record<string, any> = {};

  const addPart = (attr: string, val: any) => {
    const nameKey = `#${attr}`;
    const valueKey = `:${attr}`;
    exprAttrNames[nameKey] = attr;
    exprAttrValues[valueKey] = val;
    updateParts.push(`${nameKey} = ${valueKey}`);
  };

  if (title !== null) addPart("title", title);
  if (subHeading !== null) addPart("subHeading", subHeading);
  if (content !== null) addPart("content", content);
  if (category !== null) addPart("category", category);
  if (categoryName !== null) addPart("categoryName", categoryName); // ✅
  if (subCategory !== null) addPart("subCategory", subCategory);
  if (subCategoryName !== null) addPart("subCategoryName", subCategoryName); // ✅

  if (tagsRaw !== null) {
    try {
      addPart("tags", JSON.parse(tagsRaw));
    } catch {
      addPart("tags", []);
    }
  }

  if (coverImage instanceof File) {
    const buffer = Buffer.from(await coverImage.arrayBuffer());
    const ext = coverImage.name.split(".").pop() || "jpg";
    const key = `blogs/${blogId}/cover.${ext}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: coverImage.type,
      })
    );
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    addPart("coverImageUrl", url);
  }

  if (!updateParts.length)
    return NextResponse.json({ status: false, error: "No fields to update" }, { status: 400 });

  try {
    const updated = await dynamoDb.send(
      new UpdateCommand({
        TableName: blogsTableName,
        Key: { blog_id: blogId, user_id: userId },
        UpdateExpression: "SET " + updateParts.join(", "),
        ExpressionAttributeNames: exprAttrNames,
        ExpressionAttributeValues: exprAttrValues,
        ConditionExpression: "attribute_exists(blog_id)",
        ReturnValues: "ALL_NEW",
      })
    );

    return NextResponse.json({ status: true, blog: updated.Attributes });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json(
      { status: false, error: "Failed to update blog" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const blogId = params.id;
  if (!blogId)
    return NextResponse.json(
      { status: false, error: "Missing blog id" },
      { status: 400 }
    );

  const fd = await req.formData();
  const email = fd.get("email") as string | null;
  if (!email)
    return NextResponse.json(
      { status: false, error: "Missing email" },
      { status: 400 }
    );

  
  const userRes = await dynamoDb.send(
    new QueryCommand({
      TableName: "users",
      IndexName: "email-index",
      KeyConditionExpression: "#e = :e",
      ExpressionAttributeNames: { "#e": "email" },
      ExpressionAttributeValues: { ":e": email },
      Limit: 1
    })
  );
  const user = userRes.Items?.[0];
  if (!user)
    return NextResponse.json(
      { status: false, error: "User not found" },
      { status: 404 }
    );
  const userId = user.user_id;

  
  const blogRes = await dynamoDb.send(
    new QueryCommand({
      TableName: blogsTableName,
      KeyConditionExpression: "blog_id = :b",
      ExpressionAttributeValues: { ":b": blogId },
      Limit: 1
    })
  );
  const blog = blogRes.Items?.[0];
  if (!blog)
    return NextResponse.json(
      { status: false, error: "Blog not found" },
      { status: 404 }
    );
  if (blog.user_id !== userId)
    return NextResponse.json(
      { status: false, error: "Unauthorized" },
      { status: 403 }
    );

  /* ── 3. delete blog ────────────────────────────────────────── */
  try {
    await dynamoDb.send(
      new DeleteCommand({
        TableName: blogsTableName,
        Key: { blog_id: blogId, user_id: userId }
      })
    );
    return NextResponse.json({ status: true, message: "Blog deleted" });
  } catch {
    return NextResponse.json(
      { status: false, error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}