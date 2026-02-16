import { getBlogBySlug, getAllBlogSlugs } from "../../../lib/blogs";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import BlogPostClient from "../../../components/BlogPost";

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

    const compiled = await compile(blog.content, {
        outputFormat: "function-body",
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
            rehypeKatex,
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
    });

    return (
        <BlogPostClient
            frontmatter={blog.frontmatter}
            compiledSource={String(compiled)}
        />
    );
}
