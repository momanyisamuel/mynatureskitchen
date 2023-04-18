import S3 from "aws-sdk/clients/s3";
import { env } from "../env.mjs";


export const s3Client = new S3({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  }
});

