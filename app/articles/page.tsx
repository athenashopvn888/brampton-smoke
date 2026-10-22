import type { Metadata } from "next";
import Link from "next/link";
import { notFound, unstable_rethrow } from "next/navigation";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { loadFleetArticles, mergeArticleLinks } from "../lib/fleet/articles";
import { FLEET_ARTICLES_PATH, FLEET_ORIGIN, FLEET_STORE_NAME } from "../lib/fleet/config";
import { RESOURCE_PAGES } from "../resources/resourceData";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles",
  description: `Guides and articles from ${FLEET_STORE_NAME}.`,
  alternates: { canonical: `${FLEET_ORIGIN}${FLEET_ARTICLES_PATH}` },
};

function codedLinks() {
  const links = RESOURCE_PAGES.filter((page) => page.slug).map((page) => ({
    slug: page.slug,
    title: page.title,
    href: `/resources/${page.slug}`,
  }));
  links.push({
    slug: "cannabis-at-work-ontario-rules",
    title: "Cannabis at work: Ontario rules",
    href: "/resources/cannabis-at-work-ontario-rules",
  });
  return links;
}

async function loadArticleLinks() {
  try {
    const loaded = await loadFleetArticles();
    if (!loaded.ok) return null;
    return mergeArticleLinks(codedLinks(), loaded.articles);
  } catch (error) {
    unstable_rethrow(error);
    return null;
  }
}

export default async function ArticlesPage() {
  const links = await loadArticleLinks();
  if (!links) notFound();
  return (
    <>
      <Navbar />
      <main>
        <h1>Articles</h1>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
