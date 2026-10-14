export type SocialIcon = "github" | "instagram" | "twitter" | "mail" | "snapchat";

export interface Social {
  name: string;
  icon: SocialIcon;
  url: string;
}

export interface Experience {
  company: string;
  year: string;
}

export interface Project {
  title: string;
  source: string;
  live: string | null;
  description: string;
  video: string;
}

export const data = {
  personal: {
    name: "Danish Ansari",
    title: ["ML", "Robotics", "Finance"],
    about: "Mechatronics engineer integrating hardware and software to create applications in machine learning, robotics, and finance.",
  },
  experience: [
    { company: "Innovatio Labs", year: "2025" },
    { company: "Cridaa", year: "2024" },
    { company: "Accelus Robotics", year: "2023" },
  ],
  social: [
    { name: "GitHub", icon: "github" as SocialIcon, url: "https://github.com/dan10ish" },
    { name: "X", icon: "twitter" as SocialIcon, url: "https://x.com/dan10ish" },
    { name: "Instagram", icon: "instagram" as SocialIcon, url: "https://instagram.com/dan10ish" },
    { name: "Email", icon: "mail" as SocialIcon, url: "mailto:aansaridan@gmail.com" },
    { name: "Snapchat", icon: "snapchat" as SocialIcon, url: "https://snapchat.com/add/dan10ish" },
  ],
  projects: [
    {
      title: "Arm Visualizer",
      source: "https://github.com/dan10ish/RoboticArm",
      live: "https://dan10ish.github.io/RoboticArm/",
      description: "3D robotic arm movement visualizer and simulator",
      video: "rob-visual.mp4"
    },
    {
      title: "3DOF Robotic Arm",
      source: "https://github.com/dan10ish/3DOF-RoboticArm-C",
      live: null,
      description: "3 Degrees of Freedom robotic arm control system in C",
      video: "3dof.mp4"
    },
    {
      title: "Pathfinder",
      source: "https://github.com/dan10ish/pathfinding-visualizer",
      live: "https://dan10ish.github.io/pathfinding-visualizer/",
      description: "Interactive pathfinding algorithm visualizer with multiple algorithms",
      video: "path.mp4"
    },
    {
      title: "Office",
      source: "https://github.com/dan10ish/Office",
      live: "https://dan10ish.github.io/Office/",
      description: "Web-based office suite with document editing capabilities",
      video: "office.mp4"
    },
    {
      title: "Galaxy",
      source: "https://github.com/dan10ish/Galaxy",
      live: "https://dan10ish.github.io/Galaxy/",
      description: "Interactive galaxy simulation with particle systems",
      video: "galaxy.mp4"
    },
    {
      title: "macOS",
      source: "https://github.com/dan10ish/os",
      live: "https://os-danishs-projects-31d8c677.vercel.app/",
      description: "macOS-inspired portfolio website with desktop simulation",
      video: "mac.mp4"
    },
    {
      title: "Code Editor",
      source: "https://github.com/dan10ish/code",
      live: "http://dan10ish.github.io/code",
      description: "Web-based code editor with syntax highlighting and live preview",
      video: "code.mp4"
    },
    {
      title: "College Notes",
      source: "https://github.com/dan10ish/college",
      live: "https://dan10ish.github.io/college/",
      description: "Digital college notes and study materials platform",
      video: "notes.mp4"
    },
    {
      title: "AlgoSim",
      source: "https://github.com/dan10ish/AlgoSim",
      live: null,
      description: "Algorithm visualization and simulation tool for learning data structures and algorithms",
      video: "algosim.mp4"
    },
    {
      title: "CogniCart",
      source: "https://github.com/dan10ish/cogni-cart",
      live: null,
      description: "AI-powered shopping cart with cognitive recommendations",
      video: "cognicart.mp4"
    },
    {
      title: "Comment Toxicity",
      source: "https://github.com/dan10ish/CommentToxicity",
      live: null,
      description: "Machine learning model to detect toxic comments using NLP",
      video: "web.mp4"
    },
    {
      title: "Terminal",
      source: "https://github.com/dan10ish/Unity-Terminal_Hacker",
      live: null,
      description: "Terminal-based hacking simulation game built in Unity",
      video: "terminal.mp4"
    },
    {
      title: "Cube",
      source: "https://github.com/dan10ish/Unity-ProjectRun",
      live: null,
      description: "3D endless runner game with cube mechanics in Unity",
      video: "cube.mp4"
    }
  ]
} as const;
