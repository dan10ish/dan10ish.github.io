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
    slug: "algorithms",
    title: "Algorithms",
    date: new Date("2025-01-03"),
    tags: ["code"],
    headerImage: "/header-images/algorithms.png",
    estimatedWordCount: 400,
    status: "wip",
    home: true,
  },
  {
    slug: "how-this-site-works",
    title: "How this site works",
    date: new Date("2025-01-24"),
    tags: ["web"],
    headerImage: "/header-images/site.jpg",
    estimatedWordCount: 1030,
    status: "completed",
    home: true,
  },
];

const postCache = new Map();

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

  if (postCache.has(slug)) {
    return {
      ...post,
      content: postCache.get(slug),
      date: formatDate(post.date),
      readingTime: estimateReadingTime(post.estimatedWordCount),
    };
  }

  try {
    const content = await import(`../content/blog/${slug}.md`).then(
      (module) => module.default,
    );

    postCache.set(slug, content);

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
