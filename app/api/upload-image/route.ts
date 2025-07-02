import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";

const bucketName = process.env.S3_BUCKET_NAME!;
const region = process.env.AWS_REGION!;

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("image") as Blob;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const key = `uploads/${Date.now()}-${(file as File).name}`;
  const arrayBuffer = await file.arrayBuffer();
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: new Uint8Array(arrayBuffer),
    ContentType: file.type,
    
  }));

  const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
  return NextResponse.json({ url });
}