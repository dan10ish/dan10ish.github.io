import path from "path";
import { promises as fs } from "fs";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // Add leading zero
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

function estimateReadingTime(wordCount) {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min${readingTime > 1 ? "s" : ""}`;
}

// Blogs
const blogPosts = [
  {
    slug: "probability",
    title: "Probability",
    date: new Date("2024-09-19"),
    tags: ["machine learning", "math"],
    headerImage: "/header-images/probability.jpg",
    estimatedWordCount: 3000,
  },
  {
    slug: "neural-networks",
    title: "Neural Networks",
    date: new Date("2024-09-01"),
    tags: ["machine learning"],
    headerImage: "/header-images/neural-networks.jpg",
    estimatedWordCount: 2500,
  },
  {
    slug: "pathfinder",
    title: "Pathfinder",
    date: new Date("2024-09-28"),
    tags: ["project"],
    headerImage: "/header-images/pathfinding.jpg",
    estimatedWordCount: 3500,
  },
];

export function getBlogPosts() {
  return blogPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
    readingTime: estimateReadingTime(post.estimatedWordCount),
  }));
}

export async function getBlogPost(slug) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return null;

  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf8");
    const actualReadingTime = estimateReadingTime(content.split(/\s+/).length);
    return {
      ...post,
      content,
      date: formatDate(post.date),
      readingTime: actualReadingTime,
    };
  } catch (error) {
    console.error(`Error loading blog post content for slug: ${slug}`, error);
    return null;
  }
}
