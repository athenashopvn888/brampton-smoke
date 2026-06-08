import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Cannabis Blog & Guides — Brampton Smoke Cannabis | Brampton",
  description: "Read the latest strain reviews, dosing guides, and cannabis news from Brampton Smoke Cannabis in Brampton.",
  alternates: {
    canonical: "https://bramptonsmokecannabis.com/blog",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
