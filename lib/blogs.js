import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

export function getAllBlogs() {
    if (!fs.existsSync(blogsDirectory)) return [];

    const files = fs.readdirSync(blogsDirectory).filter((f) => f.endsWith(".mdx"));

    const blogs = files.map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const filePath = path.join(blogsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        return {
            slug,
            title: data.title || slug,
            date: data.date || "",
            description: data.description || "",
            tags: data.tags || [],
        };
    });

    return blogs.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getBlogBySlug(slug) {
    const filePath = path.join(blogsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) return null;

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        frontmatter: {
            title: data.title || slug,
            date: data.date || "",
            description: data.description || "",
            tags: data.tags || [],
        },
        content,
    };
}

export function getAllBlogSlugs() {
    if (!fs.existsSync(blogsDirectory)) return [];

    return fs
        .readdirSync(blogsDirectory)
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.replace(/\.mdx$/, ""));
}
