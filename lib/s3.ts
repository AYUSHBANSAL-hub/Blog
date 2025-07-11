import { S3Client } from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION!;

export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.BLOG_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.BLOG_AWS_SECRET_KEY!,
  },
});