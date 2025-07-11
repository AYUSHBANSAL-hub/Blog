import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

if (!process.env.BLOG_AWS_ACCESS_KEY || !process.env.BLOG_AWS_SECRET_KEY || !process.env.AWS_REGION) {
  throw new Error("Missing AWS credentials in environment variables");
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.BLOG_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.BLOG_AWS_SECRET_KEY!,
  },
});
export const dynamoDb = DynamoDBDocumentClient.from(client);