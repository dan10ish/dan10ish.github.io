import { getBlogBySlug, getAllBlogSlugs } from "../../../lib/blogs";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";
import { Home } from "lucide-react";
import BlogInteractive from "../../../components/BlogInteractive";

export async function generateStaticParams() {
    const slugs = getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);
    if (!blog) return { title: "Not Found" };

    return {
        title: `${blog.frontmatter.title} — Danish`,
        description: blog.frontmatter.description,
        openGraph: {
            title: blog.frontmatter.title,
            description: blog.frontmatter.description,
            type: "article",
            publishedTime: blog.frontmatter.date,
            authors: ["Danish"],
            url: `https://danish.bio/blog/${slug}`,
            images: [
                {
                    url: "https://i.ibb.co/vmBrhSd/OG.png",
                    width: 1200,
                    height: 675,
                    type: "image/png",
                    alt: blog.frontmatter.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: blog.frontmatter.title,
            description: blog.frontmatter.description,
            images: ["https://i.ibb.co/vmBrhSd/OG.png"],
        },
        alternates: {
            canonical: `https://danish.bio/blog/${slug}`,
        },
    };
}

const mdxOptions = {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
};

export default async function BlogPage({ params }) {
    const { slug } = await params;
    const blog = getBlogBySlug(slug);

    if (!blog) {
        return (
            <div className="blog-not-found">
                <h1>Post not found</h1>
                <a href="/">← Back home</a>
            </div>
        );
    }

    const formattedDate = blog.frontmatter.date
        ? new Date(blog.frontmatter.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "";

    return (
        <div className="blog-post-layout">
            <header className="blog-post-header">
                <Link href="/" className="blog-home-link" aria-label="Home">
                    <Home size={14} />
                    <span>Home</span>
                </Link>
                <h1>{blog.frontmatter.title}</h1>
                <div className="blog-post-meta">
                    {formattedDate && <time dateTime={blog.frontmatter.date}>{formattedDate}</time>}
                    {blog.frontmatter.tags?.length > 0 && (
                        <div className="blog-post-tags">
                            {blog.frontmatter.tags.map((tag) => (
                                <span key={tag} className="blog-tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="blog-post-body">
                <article className="blog-content">
                    <MDXRemote
                        source={blog.content}
                        options={{ mdxOptions }}
                    />
                </article>
            </div>

            <BlogInteractive />
        </div>
    );
}
