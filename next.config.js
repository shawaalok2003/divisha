/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
        STORAGE_ACCESS_KEY: process.env.AWS_SPACE_ACCESS_KEY,
        STORAGE_ACCESS_SECRET: process.env.AWS_SPACE_ACCESS_SECRET,
        RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    },
};

module.exports = nextConfig;
