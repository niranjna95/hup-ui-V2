/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: ["cdn.ednaapp.net"],
  // },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/account/login",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
