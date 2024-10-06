import path from "path";
import { promises as fs } from "fs";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

// Blogs
const blogPosts = [
  {
    slug: "probability",
    title: "Probability",
    date: new Date("2024-09-19"),
    tags: ["machine learning", "math"],
  },
  {
    slug: "neural-networks",
    title: "Neural Networks",
    date: new Date("2024-09-01"),
    tags: ["machine learning"],
  },
  {
    slug: "pathfinding-visualizer",
    title: "Pathfinding Visualizer",
    date: new Date("2024-09-28"),
    tags: ["project"],
  },
];

export function getBlogPosts() {
  return blogPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));
}

export async function getBlogPost(slug) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return null;

  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf8");
    return { ...post, content, date: formatDate(post.date) };
  } catch (error) {
    console.error(`Error loading blog post content for slug: ${slug}`, error);
    return null;
  }
}
