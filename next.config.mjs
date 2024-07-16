/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SECRETKEY:"A6GB^!&1feH3V5%LdQU"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'images.pexels.com',
        port: "",
        pathname: "/photos/220453/*",
      },
      
    ],
  },
};

export default nextConfig;
