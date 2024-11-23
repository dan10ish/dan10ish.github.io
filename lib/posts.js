import path from "path";
import { promises as fs } from "fs";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

function estimateReadingTime(wordCount) {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  const formattedTime = readingTime < 10 ? `0${readingTime}` : readingTime;
  return `${formattedTime} min${readingTime > 1 ? "s" : ""}`;
}

// Blogs
const blogPosts = [
  {
    slug: "arm-visualizer",
    title: "Arm Visualizer",
    date: new Date("2024-11-11"),
    tags: ["robotics", "project"],
    headerImage: "/header-images/robotics.jpg",
    estimatedWordCount: 1247,
    status: "completed", // 'completed', 'draft', or 'development'
  },
  {
    slug: "pathfinder",
    title: "Pathfinder",
    date: new Date("2024-09-28"),
    tags: ["project"],
    headerImage: "/header-images/pathfinding.jpg",
    estimatedWordCount: 3500,
    status: "completed",
  },
  {
    slug: "neetcode",
    title: "NeetCode Roadmap",
    date: new Date("2024-11-12"),
    tags: ["code"],
    headerImage: "/header-images/neetcode.jpg",
    estimatedWordCount: 400,
    status: "development",
  },
  {
    slug: "how-this-site-works",
    title: "How this site works",
    date: new Date("2024-10-27"),
    tags: ["web"],
    headerImage: "/header-images/site.jpg",
    estimatedWordCount: 1030,
    status: "completed",
  },

  {
    slug: "sample",
    title: "Technical Blog",
    date: new Date("2024-11-24"),
    tags: ["web"],
    headerImage: "/header-images/site.jpg",
    estimatedWordCount: 1030,
    status: "draft",
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
