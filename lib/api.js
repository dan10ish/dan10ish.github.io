import path from "path";
import { promises as fs } from "fs";

// Blogs
const blogPosts = [
  {
    slug: "probability",
    title: "Probability",
    date: "2023-09-19",
    tags: ["machine learning", "math"],
  },
  {
    slug: "neural-networks",
    title: "Neural Networks",
    date: "2023-09-01",
    tags: ["machine learning"],
  },
];

// Projects
const projects = [
  {
    title: "Comment Toxicity",
    description:
      "Real-time comment toxicity detection system developed using deep learning",
    sourceLink: "https://github.com/dan10ish/CommentToxicity",
    projectLink: null,
    tags: ["tensorflow", "python"],
  },
  {
    title: "Pathfinding Visualizer",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://danish.bio/pathfinding-visualizer/",
    tags: ["react.js", "algorithms"],
  },
];

export function getBlogPosts() {
  return blogPosts;
}

export async function getBlogPost(slug) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return null;

  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf8");
    return { ...post, content };
  } catch (error) {
    console.error(`Error loading blog post content for slug: ${slug}`, error);
    return null;
  }
}
