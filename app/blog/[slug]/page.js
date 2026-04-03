import { getBlogBySlug, getAllBlogSlugs } from "../../../lib/blogs";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";

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
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">Post not found</h1>
                <Link href="/" className="text-blue-500 hover:underline">← Back home</Link>
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
        <div className="max-w-750 mx-auto px-1 sm:px-2 py-4">
            <header className="mb-8 px-2">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-4 leading-tight">
                    {blog.frontmatter.title}
                </h1>
                <div className="flex items-center gap-4 flex-wrap">
                    {formattedDate && (
                        <time dateTime={blog.frontmatter.date} className="text-foreground/40 text-[0.9rem]">
                            {formattedDate}
                        </time>
                    )}
                    {blog.frontmatter.tags?.length > 0 && (
                        <div className="flex gap-2">
                            {blog.frontmatter.tags.map((tag) => (
                                <span key={tag} className="text-[0.8rem] px-2 py-0.5 rounded border border-foreground/10 text-foreground/60 font-bold uppercase tracking-tighter bg-foreground/[0.02]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            <div className="relative">
                <article className="prose prose-sm dark:prose-invert max-w-none text-foreground/80 selection:bg-black/5 dark:selection:bg-white/10 no-scrollbar">
                    <div className="[&>h2]:text-lg [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>p]:mb-4 [&>p]:leading-[1.8] [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>li]:mb-1.5 [&>blockquote]:border-l-2 [&>blockquote]:border-foreground/15 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-foreground/60 [&>pre]:no-scrollbar [&>pre]:bg-foreground/[0.03] [&>pre]:border [&>pre]:border-foreground/5 [&>pre]:rounded-xl [&>pre]:p-4 [&>pre]:my-8 [&>code]:bg-foreground/[0.05] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-[0.9em] [&>pre>code]:bg-transparent [&>pre>code]:p-0">
                        <MDXRemote
                            source={blog.content}
                            options={{ mdxOptions }}
                        />
                    </div>
                </article>
            </div>
            
        </div>
    );
}
