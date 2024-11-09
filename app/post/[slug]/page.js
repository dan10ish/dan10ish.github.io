import { getBlogPost, getBlogPosts } from "../../../lib/posts";
import ScrollToTop from "../../../components/ScrollToTop";
import LatexRenderer from "../../../components/LatexRenderer";
import { markdownToHtml } from "../../../lib/mdxutils";
import dynamic from "next/dynamic";
import "katex/dist/katex.min.css";
import Footer from "@/components/Footer";

const HighlightCode = dynamic(
  () => import("../../../components/HighlightCode"),
  { ssr: false }
);

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const baseUrl = "https://dan10ish.github.io";
  const imageUrl = post.headerImage.startsWith("http")
    ? post.headerImage
    : `${baseUrl}${post.headerImage}`;

  return {
    title: post.title,
    description: `${post.title} - A blog post by Danish`,
    openGraph: {
      title: post.title,
      description: `${post.title} - A blog post by Danish`,
      type: "article",
      url: `${baseUrl}/post/${post.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `${post.title} - A blog post by Danish`,
      images: [imageUrl],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <article className="blog-post markdown-body">
      <div className="blogpost-title">
        <h1>{post.title}</h1>
      </div>
      <div className="blog-meta">
        <div>
          <p className="blog-date">{post.date}</p>
        </div>
        <div>|</div>
        <div>
          <a
            href="https://x.com/dan10ish"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="at">@</span>dan10ish
          </a>
        </div>
      </div>
      <div className="mark">
        <LatexRenderer content={contentHtml} />
      </div>
      <HighlightCode />
      <ScrollToTop />
      <Footer blogSlug={slug} />
    </article>
  );
}
