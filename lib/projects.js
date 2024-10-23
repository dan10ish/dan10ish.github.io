const projects = [
  {
    title: "Pathfinder",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://dan10ish.github.io/pathfinding-visualizer/",
    tags: ["web"],
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
    tags: ["ml"],
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    title: "Office",
    description: "3D website using r3f, framer-motion & Blender",
    sourceLink: "https://github.com/dan10ish/Office",
    projectLink: "https://dan10ish.github.io/Office/",
    tags: ["web"],
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    title: "Arm Visualizer",
    description:
      "3DOF robotic arm visualization using r3f, drei & framer-motion",
    sourceLink: "https://github.com/dan10ish/RoboticArm",
    projectLink: "https://dan10ish.github.io/RoboticArm/",
    tags: ["robotics"],
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    title: "Personal Website",
    description: "This website with project showcase and blog functionality",
    sourceLink: "https://github.com/dan10ish/dan10ish.github.io",
    projectLink: "https://dan10ish.github.io",
    tags: ["web"],
    gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  },
];

export function getProjects() {
  return projects;
}
