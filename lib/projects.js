const projects = [
  {
    title: "Comment Toxicity",
    description:
      "Real-time comment toxicity detection algorithm developed using deep learning",
    sourceLink: "https://github.com/dan10ish/CommentToxicity",
    projectLink: null,
    tags: ["tensorflow", "python"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Pathfinding Visualizer",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://danish.bio/pathfinding-visualizer/",
    tags: ["react", "algorithms"],
    gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  },
  {
    title: "Personal Website",
    description: "This website you're currently viewing",
    sourceLink: "https://github.com/dan10ish/dan10ish.github.io",
    projectLink: "https://danish.bio",
    tags: ["react", "next"],
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
];

export function getProjects() {
  return projects;
}
