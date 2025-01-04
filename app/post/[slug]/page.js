import { getBlogPost, getBlogPosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/mdxutils";
import { MDXContent } from "@/components/ClientWrapper";
import ButtonsContainer from "@/components/ButtonsContainer";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer"));

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPostFromParams(params) {
  return await Promise.resolve(params);
}

export async function generateMetadata(props) {
  const baseUrl = "https://dan10ish.github.io";
  const params = await getPostFromParams(props.params);
  const post = await getBlogPost(String(params?.slug));

  if (!post) {
    return { title: "Post not found" };
  }

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
      url: `${baseUrl}/post/${String(params?.slug)}`,
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

export default async function BlogPost(props) {
  const params = await getPostFromParams(props.params);
  const post = await getBlogPost(String(params?.slug));

  if (!post) {
    return <div>Post not found</div>;
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <>
      <ButtonsContainer />
      <article className="blog-post markdown-body">
        <div className="blogpost-title">
          <h1>{post.title}</h1>
          {post.status === "wip" && (
            <span className="wip-badge">🏗️ Work In Progress</span>
          )}
        </div>
        <div className="blogpost-meta">
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
        <MDXContent content={contentHtml} />
        <Footer blogSlug={params?.slug} />
      </article>
    </>
  );
}
