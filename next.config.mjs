/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "images.pexels.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
