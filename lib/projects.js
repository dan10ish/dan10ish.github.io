const projects = [
  {
    title: "Pathfinding Visualizer",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://dan10ish.github.io/pathfinding-visualizer/",
    tags: ["react", "algorithms"],
    gradient: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
  },
  {
    title: "Comment Toxicity",
    description: "Toxicity detection algorithm developed using deep learning",
    sourceLink: "https://github.com/dan10ish/CommentToxicity",
    projectLink: null,
    tags: ["tensorflow", "python"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Office",
    description: "3D website made using r3f, framer-motion-3d and Blender",
    sourceLink: "https://github.com/dan10ish/Office",
    projectLink: "https://dan10ish.github.io/Office/",
    tags: ["three.js", "react", "framer"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Personal Website",
    description: "This website with project showcase and blog functionality",
    sourceLink: "https://github.com/dan10ish/dan10ish.github.io",
    projectLink: "https://dan10ish.github.io",
    tags: ["react", "next"],
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
];

export function getProjects() {
  return projects;
}
