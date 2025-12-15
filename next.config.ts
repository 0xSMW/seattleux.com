import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      { source: "/directories", destination: "/agencies", permanent: true },
      { source: "/directories/firms", destination: "/agencies", permanent: true },
      { source: "/directories/firms/:slug", destination: "/agencies/:slug", permanent: true },
      { source: "/directories/companies", destination: "/teams", permanent: true },
      {
        source: "/directories/companies/:slug",
        destination: "/teams/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
