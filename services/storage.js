import AWS from "aws-sdk";
import CONFIG from "../config";

const StorageService = new AWS.S3({
    region: "ap-south-1",
    signatureVersion: "v4",
    endpoint: new AWS.Endpoint(CONFIG.AWS_SPACE_ENDPOINT),
    accessKeyId: CONFIG.AWS_SPACE_ACCESS_KEY_ID,
    secretAccessKey: CONFIG.AWS_SPACE_ACCESS_SECRET_KEY,
});

export default StorageService;
