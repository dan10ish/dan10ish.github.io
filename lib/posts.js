const blogPosts = [
  {
    slug: "arm-visualizer",
    title: "Arm Visualizer",
    date: new Date("2024-11-11"),
    tags: ["robotics", "project"],
    headerImage: "/header-images/robotics.jpg",
    estimatedWordCount: 1247,
    status: "completed",
    home: true,
  },
  {
    slug: "pathfinder",
    title: "Pathfinder",
    date: new Date("2024-09-28"),
    tags: ["project"],
    headerImage: "/header-images/pathfinding.jpg",
    estimatedWordCount: 3500,
    status: "completed",
    home: false,
  },
  {
    slug: "neetcode",
    title: "NeetCode Roadmap",
    date: new Date("2024-11-12"),
    tags: ["code"],
    headerImage: "/header-images/neetcode.jpg",
    estimatedWordCount: 400,
    status: "development",
    home: true,
  },
  {
    slug: "how-this-site-works",
    title: "How this site works",
    date: new Date("2024-10-27"),
    tags: ["web"],
    headerImage: "/header-images/site.jpg",
    estimatedWordCount: 1030,
    status: "completed",
    home: true,
  },
];

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

export function getBlogPosts() {
  return blogPosts
    .sort((a, b) => {
      if (a.home !== b.home) return b.home ? 1 : -1;
      return b.date - a.date;
    })
    .map((post) => ({
      ...post,
      date: formatDate(post.date),
      readingTime: estimateReadingTime(post.estimatedWordCount),
      year: post.date.getFullYear().toString(),
    }));
}
export async function getBlogPost(slug) {
  const post = blogPosts.find((post) => post.slug === slug);
  if (!post) return null;

  try {
    const content = await import(`../content/blog/${slug}.md`).then(
      (module) => module.default,
    );
    return {
      ...post,
      content,
      date: formatDate(post.date),
      readingTime: estimateReadingTime(content.split(/\s+/).length),
    };
  } catch (error) {
    console.error(`Error loading blog post content for slug: ${slug}`, error);
    return null;
  }
}
