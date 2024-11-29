const projects = [
  {
    title: "Code",
    description: "Code Python, C++ & JavaScript with no setup ",
    sourceLink: "https://github.com/dan10ish/code",
    projectLink: "http://dan10ish.github.io/code",
    tags: ["web"],
  },
  {
    title: "Pathfinder",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://dan10ish.github.io/pathfinding-visualizer/",
    tags: ["web"],
  },
  {
    title: "3DOF Robotic Arm",
    description: "Math modelling of a yaw-pitch-pitch 3DOF robotic arm in C",
    sourceLink: "https://github.com/dan10ish/3DOF-RoboticArm-C",
    projectLink: null,
    tags: ["robotics"],
  },
  {
    title: "Arm Visualizer",
    description:
      "3DOF robotic arm visualization using r3f, drei & framer-motion",
    sourceLink: "https://github.com/dan10ish/RoboticArm",
    projectLink: "https://dan10ish.github.io/RoboticArm/",
    tags: ["robotics"],
  },
  {
    title: "Comment Toxicity",
    description: "Toxicity detection algorithm developed using deep learning",
    sourceLink: "https://github.com/dan10ish/CommentToxicity",
    projectLink: null,
    tags: ["ml"],
  },
  {
    title: "Office",
    description: "3D website using r3f, framer-motion & Blender",
    sourceLink: "https://github.com/dan10ish/Office",
    projectLink: "https://dan10ish.github.io/Office/",
    tags: ["web"],
  },
  {
    title: "Personal Website",
    description: "This website with project showcase and blog functionality",
    sourceLink: "https://github.com/dan10ish/dan10ish.github.io",
    projectLink: "https://dan10ish.github.io",
    tags: ["web"],
  },
];

export function getProjects() {
  return projects;
}
