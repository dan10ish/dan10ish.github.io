import { getBlogPost, getBlogPosts } from "../../../lib/api";
import TableOfContents from "../../../components/TableOfContents";
import ReturnToHome from "../../../components/ReturnToHome";
import ScrollToTop from "../../../components/ScrollToTop";
import LatexRenderer from "../../../components/LatexRenderer";
import { markdownToHtml } from "../../../lib/mdxutils";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
      <ReturnToHome />
      <h1>{post.title}</h1>
      <p className="blog-date">{post.date}</p>
      <TableOfContents content={contentHtml} />
      <div className="mark">
        <LatexRenderer content={contentHtml} />
      </div>
      <ScrollToTop />
    </article>
  );
}
