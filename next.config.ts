import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bramptonsmokecannabis.com" },
      { protocol: "https", hostname: "kennedyloudcannabis.com" },
      { protocol: "https", hostname: "stclaircannabis.com" },
      { protocol: "https", hostname: "pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev", pathname: "/products/**" },
      { protocol: "https", hostname: "athena-cannabis-images.vercel.app", pathname: "/products/delivery/v1/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/delivery", destination: "/weed-delivery-brampton", statusCode: 301 },
      { source: "/exotic", destination: "/exotic-weed", statusCode: 301 },
      { source: "/premium", destination: "/premium-weed", statusCode: 301 },
      { source: "/aaa", destination: "/aaa-weed", statusCode: 301 },
      { source: "/aa", destination: "/aa-weed", statusCode: 301 },
      { source: "/budget", destination: "/budget-weed", statusCode: 301 },
      { source: "/resources/flower-guide", destination: "/resources/weed-flower-guide", statusCode: 301 },
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/blog/:path*", destination: "/resources", permanent: true },
      { source: "/edibles", destination: "/items/edibles", permanent: true },
      { source: "/vapes", destination: "/items/vapes", permanent: true },
      { source: "/vape-disposables", destination: "/items/vape-disposables", permanent: true },
      { source: "/concentrates", destination: "/items/concentrates", permanent: true },
      { source: "/prerolls", destination: "/items/prerolls", permanent: true },
      { source: "/add-ons", destination: "/items/add-ons", permanent: true },
      { source: "/cigarettes", destination: "/items/cigarettes", permanent: true },
      { source: "/magic", destination: "/items/magic", permanent: true },
      { source: "/info/york-weed-dispensary", destination: "/info/brampton-weed-dispensary", permanent: true },
      { source: "/info/cheap-weed-york", destination: "/info/cheap-weed-brampton", permanent: true },
      { source: "/info/native-cigarettes-york", destination: "/info/native-cigarettes-brampton", permanent: true },
      { source: "/info/dispensary-near-me-york", destination: "/info/dispensary-near-me-brampton", permanent: true },
      { source: "/info/weed-store-near-mississauga", destination: "/info/weed-store-near-brampton", permanent: true },
    ];
  },
};

export default nextConfig;
