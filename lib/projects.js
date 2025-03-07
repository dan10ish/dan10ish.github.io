const projects = [
  {
    title: "Cold Mail Bot",
    description:
      "Drop a job post URL + your resume, get a tailored cold email in seconds using generative AI.",
    sourceLink: "https://github.com/dan10ish/coldmailbot",
    projectLink: "https://mailbot.streamlit.app",
    tags: ["ml"],
    home: true,
    // highlight: true,
  },
  {
    title: "Code",
    description: "Code Python, C++ & JavaScript with no setup.",
    sourceLink: "https://github.com/dan10ish/code",
    projectLink: "http://dan10ish.github.io/code",
    tags: ["web"],
    home: true,
  },
  {
    title: "3DOF Robotic Arm",
    description: "Math modelling of a yaw-pitch-pitch 3DOF robotic arm in C",
    sourceLink: "https://github.com/dan10ish/3DOF-RoboticArm-C",
    projectLink: null,
    tags: ["rbtx"],
    home: true,
  },
  {
    title: "Pathfinder",
    description: "Visualize Dijkstra, A*, BFS & DFS on random generated mazes",
    sourceLink: "https://github.com/dan10ish/pathfinding-visualizer",
    projectLink: "https://dan10ish.github.io/pathfinding-visualizer/",
    tags: ["web"],
    home: true,
  },
  {
    title: "macOS Portfolio",
    description: "Personal website showcased in a macOS-style UI interface",
    sourceLink: "https://github.com/dan10ish/os",
    projectLink: "https://os.danish.bio",
    tags: ["web"],
    home: true,
  },
  {
    title: "Arm Visualizer",
    description:
      "3DOF robotic arm visualization using r3f, drei & framer-motion",
    sourceLink: "https://github.com/dan10ish/RoboticArm",
    projectLink: "https://dan10ish.github.io/RoboticArm/",
    tags: ["rbtx"],
    home: true,
  },
  {
    title: "College Notes",
    description: "Library-style UI showcasing B.Tech Mechatronics Engineering notes covering AI/ML, Robotics, Control Systems and more",
    sourceLink: "https://github.com/dan10ish/college",
    projectLink: "https://danish.bio/college/",
    tags: ["notes"],
    home: true,
  },
  {
    title: "Comment Toxicity",
    description: "Toxicity detection algorithm developed using deep learning",
    sourceLink: "https://github.com/dan10ish/CommentToxicity",
    projectLink: null,
    tags: ["ml"],
    home: false,
  },
  {
    title: "Office",
    description: "3D website using r3f, framer-motion & Blender",
    sourceLink: "https://github.com/dan10ish/Office",
    projectLink: "https://dan10ish.github.io/Office/",
    tags: ["web"],
    home: false,
  },
  {
    title: "Personal Website",
    description: "This website with project showcase and blog functionality",
    sourceLink: "https://github.com/dan10ish/dan10ish.github.io",
    projectLink: "https://dan10ish.github.io",
    tags: ["web"],
    home: false,
  },
];

export function getProjects() {
  return projects;
}
