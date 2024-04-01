import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { v4 as uuidv4 } from "uuid";

export const uploadImage = async (base64Image: string) => {
  const bucketName = process.env.AWS_BUCKET_NAME;

  const s3 = new S3Client({ region: process.env.AWS_REGION });

  const buffer = Buffer.from(base64Image, "base64");
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  const params = {
    Bucket: bucketName,
    Key: uuidv4(),
    Body: stream,
    ContentType: "image/png",
    ContentLength: buffer.length,
    ACL: "public-read" as const,
  };

  await s3.send(new PutObjectCommand(params));
};