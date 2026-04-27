export const personalInfo = {
  name: "Danish Ansari",
  about: "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.",
  socials: {
    github: "dan10ish",
    x: "dan10ish",
    instagram: "dan10ish",
    email: "aansaridan@gmail.com",
    linkedin: "dan10ish",
    snapchat: "dan10ish",
    threads: "dan10ish"
  }
};

export const projects = [
  {
    name: "Pathfinder",
    sourceCode: "https://github.com/dan10ish/pathfinding-visualizer",
    liveDemo: "https://dan10ish.github.io/pathfinding-visualizer/",
    tag: "algorithm",
    video: "path.mp4"
  },
  {
    name: "3DOF Robotic Arm",
    sourceCode: "https://github.com/dan10ish/3DOF-RoboticArm-C",
    tag: "robotics",
    video: "3dof.mp4"
  },
  {
    name: "AlgoSim",
    sourceCode: "https://github.com/dan10ish/AlgoSim",
    tag: "algorithm",
    video: "algosim.mp4"
  },
  {
    name: "Arm Visualizer",
    sourceCode: "https://github.com/dan10ish/RoboticArm",
    liveDemo: "https://dan10ish.github.io/RoboticArm/",
    tag: "robotics",
    video: "rob-visual.mp4"
  },
  {
    name: "Galaxy",
    sourceCode: "https://github.com/dan10ish/Galaxy",
    liveDemo: "https://dan10ish.github.io/Galaxy/",
    tag: "web",
    video: "galaxy.mp4"
  },
  {
    name: "macOS Portfolio",
    sourceCode: "https://github.com/dan10ish/os",
    liveDemo: "https://os-danishs-projects-31d8c677.vercel.app/",
    tag: "web",
    video: "mac.mp4"
  },
  {
    name: "Code Editor",
    sourceCode: "https://github.com/dan10ish/code",
    liveDemo: "http://dan10ish.github.io/code",
    tag: "web",
    video: "code.mp4"
  },
  {
    name: "Office",
    sourceCode: "https://github.com/dan10ish/Office",
    liveDemo: "https://dan10ish.github.io/Office/",
    tag: "game",
    video: "office.mp4"
  },
  {
    name: "Cube Runner",
    sourceCode: "https://github.com/dan10ish/Unity-ProjectRun",
    tag: "game",
    video: "cube.mp4"
  },
  {
    name: "Terminal Hacker",
    sourceCode: "https://github.com/dan10ish/Unity-Terminal_Hacker",
    tag: "game",
    video: "terminal.mp4"
  },
  {
    name: "CogniCart",
    sourceCode: "https://github.com/dan10ish/cogni-cart",
    tag: "machine learning",
    video: "cognicart.mp4"
  },
  {
    name: "College Notes",
    sourceCode: "https://github.com/dan10ish/college",
    liveDemo: "https://dan10ish.github.io/college/",
    tag: "college",
    video: "notes.mp4"
  },
  {
    name: "Comment Toxicity",
    sourceCode: "https://github.com/dan10ish/CommentToxicity",
    tag: "machine learning"
  },
  {
    name: "Personal Website",
    sourceCode: "https://github.com/dan10ish/dan10ish.github.io",
    liveDemo: "https://dan10ish.github.io",
    tag: "web",
    video: "web.mp4"
  }
];

export interface Note {
  file: string;
  title: string;
  semester: number;
  cover: string;
}

export const notes: Note[] = [
  { file: "/notes/semester5/DME.pdf",  title: "Design of Machine Elements",         semester: 5, cover: "bg-amber-600 text-white" },
  { file: "/notes/semester5/DSM.pdf",  title: "Dynamic Systems Modelling",               semester: 5, cover: "bg-red-700 text-white" },
  { file: "/notes/semester5/SAS.pdf",  title: "Signals and Systems",              semester: 5, cover: "bg-orange-700 text-white" },
  { file: "/notes/semester5/Rough.pdf", title: "Rough Work",                        semester: 5, cover: "bg-stone-700 text-white" },
  { file: "/notes/semester6/AIML.pdf", title: "AI and Machine Learning",            semester: 6, cover: "bg-indigo-700 text-white" },
  { file: "/notes/semester6/GTA.pdf",  title: "Graph Theory and Applications",      semester: 6, cover: "bg-blue-700 text-white" },
  { file: "/notes/semester6/MCS.pdf",  title: "Modern Control Systems",            semester: 6, cover: "bg-sky-700 text-white" },
  { file: "/notes/semester6/PLC.pdf",  title: "Programmable Logic Controllers",     semester: 6, cover: "bg-cyan-800 text-white" },
  { file: "/notes/semester7/IRMC.pdf", title: "Industrial Robotics & Motion Control", semester: 7, cover: "bg-emerald-700 text-white" },
  { file: "/notes/semester7/MSD.pdf",  title: "Mechatronic Systems Design",          semester: 7, cover: "bg-teal-700 text-white" },
  { file: "/notes/semester7/RSD.pdf",  title: "Robotic Systems Design",              semester: 7, cover: "bg-green-700 text-white" }
];