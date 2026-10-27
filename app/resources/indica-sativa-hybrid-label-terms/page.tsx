import type { Metadata } from "next";
import Footer from "../../components/Footer";
import { JsonLd } from "../../components/JsonLd";
import Navbar from "../../components/Navbar";
import ArticleBody from "./ArticleBody";
import { ARTICLE_MARKDOWN, CANONICAL_URL, metaDescription } from "./article";
import styles from "./article.module.css";
import { articleHeading, firstUsefulParagraph, parseArticle, plainText } from "./renderArticle";

const blocks = parseArticle(ARTICLE_MARKDOWN);
const heading = articleHeading(blocks);
const description = metaDescription(firstUsefulParagraph(blocks));
const checked = blocks.find((block) => block.type === "p" && plainText(block.inlines).startsWith("Last checked:"));
const bodyBlocks = blocks.filter((block) => block.type !== "h1" && block !== checked);

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: heading,
  description,
  datePublished: "2026-10-27",
  dateModified: "2026-10-27",
  inLanguage: "en-CA",
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": CANONICAL_URL,
  },
  url: CANONICAL_URL,
  author: {
    "@type": "Organization",
    name: "Brampton Smoke Cannabis",
    url: "https://www.bramptonsmokecannabis.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Brampton Smoke Cannabis",
    url: "https://www.bramptonsmokecannabis.com",
  },
};

export const metadata: Metadata = {
  title: { absolute: heading },
  description,
  alternates: { canonical: CANONICAL_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "article",
    locale: "en_CA",
    url: CANONICAL_URL,
    siteName: "Brampton Smoke Cannabis",
    title: heading,
    description,
    images: [
      {
        url: "https://www.bramptonsmokecannabis.com/wp-content/uploads/2026/04/46Oi5.jpg",
        width: 1200,
        height: 630,
        alt: "Brampton Smoke Cannabis — Premium Cannabis Dispensary Brampton",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: heading,
    description,
    images: ["https://www.bramptonsmokecannabis.com/wp-content/uploads/2026/04/46Oi5.jpg"],
  },
};

export default function IndicaSativaHybridLabelTermsPage() {
  return (
    <main className={styles.main}>
      <JsonLd data={articleJsonLd} />
      <Navbar />
      <article>
        <header className={styles.hero}>
          <div className={styles.wrap}>
            <h1>{heading}</h1>
            {checked && checked.type === "p" ? (
              <p className={styles.checked}>{plainText(checked.inlines)}</p>
            ) : null}
          </div>
        </header>
        <div className={styles.prose}>
          <ArticleBody blocks={bodyBlocks} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
