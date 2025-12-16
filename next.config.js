/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "commondatastorage.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "api.dicebear.com",
            },
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    serverExternalPackages: ["@hashgraph/sdk", "pino", "thread-stream"],
};

module.exports = nextConfig;

