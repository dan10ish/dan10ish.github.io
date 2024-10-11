const projects = [
  {
    title: "Pathfinding Visualizer",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://dan10ish.github.io/pathfinding-visualizer/",
    tags: ["react"],
    gradient: "linear-gradient(135deg, #79F1A4 0%, #0E5CAD 100%)",
  },
  {
    title: "3DOF Robotic Arm",
    description: "Math modelling of a yaw-pitch-pitch 3DOF robotic arm in C",
    sourceLink: "https://github.com/dan10ish/3DOF-RoboticArm-C",
    projectLink: null,
    tags: ["robotics"],
    gradient: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
  },
  {
    title: "Comment Toxicity",
    description: "Toxicity detection algorithm developed using deep learning",
    sourceLink: "https://github.com/dan10ish/CommentToxicity",
    projectLink: null,
    tags: ["machine learning"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Office",
    description: "3D website made using r3f, framer-motion-3d and Blender",
    sourceLink: "https://github.com/dan10ish/Office",
    projectLink: "https://dan10ish.github.io/Office/",
    tags: ["react", "3D"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Robotic Arm",
    description:
      "3 DOF robotic arm visualization using ReactThreeFiber and Drei",
    sourceLink: "https://github.com/dan10ish/RoboticArm",
    projectLink: "https://dan10ish.github.io/RoboticArm/",
    tags: ["react", "3D", "robotics"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "Personal Website",
    description: "This website with project showcase and blog functionality",
    sourceLink: "https://github.com/dan10ish/dan10ish.github.io",
    projectLink: "https://dan10ish.github.io",
    tags: ["next"],
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
];

export function getProjects() {
  return projects;
}
