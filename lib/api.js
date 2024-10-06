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

// Books data
const books = [
  {
    title: "Hands-On Machine Learning",
    author: "Aurélien Géron",
    color: "#4285F4",
    size: "l",
  },
  {
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    color: "#DB4437",
    size: "l",
  },
  {
    title: "Modern Robotics",
    author: "Kevin M. Lynch",
    color: "#0F9D58",
    size: "m",
  },
  {
    title: "Open Data Structures",
    author: "Pat Morin",
    color: "#F4B400",
    size: "m",
  },
  {
    title: "The Intelligence Trap",
    author: "David Robson",
    color: "#7B1FA2",
    size: "m",
  },
  {
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    color: "#FB8C00",
    size: "s",
  },
  {
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    color: "#00897B",
    size: "l",
  },
];
export function getBooks() {
  return books;
}

export function getBlogPosts() {
  return blogPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));
}

export function getBlogPost(slug) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return null;
  return { ...post, date: formatDate(post.date) };
}

export function getProjects() {
  return projects;
}
