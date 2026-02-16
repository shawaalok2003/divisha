import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const CONFIG = {
    NODE_ENV: process.env["NEXT_PUBLIC_NODE_ENV"] || "development",
    LAUNCH_MODE: process.env["NEXT_PUBLIC_LAUNCH_MODE"] === "true" ? true : false,
    MAINTENANCE_MODE: process.env["NEXT_PUBLIC_MAINTENANCE_MODE"] === "true" ? true : false,
    API_URL: process.env["NEXT_PUBLIC_API_URL"] || "http://localhost:3333",
    AWS_SPACE_BUCKET: process.env["NEXT_PUBLIC_AWS_SPACE_BUCKET"] || "",
    AWS_SPACE_ENDPOINT: process.env["NEXT_PUBLIC_AWS_SPACE_ENDPOINT"] || "",
    AWS_SPACE_ACCESS_KEY_ID: publicRuntimeConfig.STORAGE_ACCESS_KEY || "",
    AWS_SPACE_ACCESS_SECRET_KEY: publicRuntimeConfig.STORAGE_ACCESS_SECRET || "",
    RAZORPAY_KEY_ID: publicRuntimeConfig.RAZORPAY_KEY || "",
    NGROK_URL: process.env["NEXT_PUBLIC_NGROK_URL"] || "",
    STARTUP_SUBSCRIPTION_MODE: process.env["NEXT_PUBLIC_STARTUP_SUBSCRIPTION_MODE"] || "onetime",
    DEBUG_MODE: process.env["DEBUG_MODE"] || false,
};

export default CONFIG;
