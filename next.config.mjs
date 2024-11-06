/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                hostname: "firebasestorage.googleapis.com"
            },
            {
                hostname: "platform-lookaside.fbsbx.com"
            },
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "static.vecteezy.com"
            }
        ]
    }
};

export default nextConfig;