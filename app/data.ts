export type SocialIcon = "github" | "instagram" | "linkedin" | "twitter" | "mail" | "snapchat" | "threads";

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
  tag: string;
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
    { name: "LinkedIn", icon: "linkedin" as SocialIcon, url: "https://linkedin.com/in/dan10ish" },
    { name: "Threads", icon: "threads" as SocialIcon, url: "https://threads.net/@dan10ish" },
    { name: "Email", icon: "mail" as SocialIcon, url: "mailto:aansaridan@gmail.com" },
    { name: "Snapchat", icon: "snapchat" as SocialIcon, url: "https://snapchat.com/add/dan10ish" },
  ],
  projects: [
    {
      title: "AlgoSim",
      source: "https://github.com/dan10ish/AlgoSim",
      live: null,
      description: "Algorithm visualization and simulation tool for learning data structures and algorithms",
      tag: "Algorithm"
    },
    {
      title: "CogniCart",
      source: "https://github.com/dan10ish/cogni-cart",
      live: null,
      description: "AI-powered shopping cart with cognitive recommendations",
      tag: "AI"
    },
    {
      title: "Code Editor",
      source: "https://github.com/dan10ish/code",
      live: "http://dan10ish.github.io/code",
      description: "Web-based code editor with syntax highlighting and live preview",
      tag: "Web"
    },
    {
      title: "3DOF Robotic Arm",
      source: "https://github.com/dan10ish/3DOF-RoboticArm-C",
      live: null,
      description: "3 Degrees of Freedom robotic arm control system in C",
      tag: "Robotics"
    },
    {
      title: "Pathfinder",
      source: "https://github.com/dan10ish/pathfinding-visualizer",
      live: "https://dan10ish.github.io/pathfinding-visualizer/",
      description: "Interactive pathfinding algorithm visualizer with multiple algorithms",
      tag: "Algorithm"
    },
    {
      title: "Arm Visualizer",
      source: "https://github.com/dan10ish/RoboticArm",
      live: "https://dan10ish.github.io/RoboticArm/",
      description: "3D robotic arm movement visualizer and simulator",
      tag: "Robotics"
    },
    {
      title: "College Notes",
      source: "https://github.com/dan10ish/college",
      live: "https://dan10ish.github.io/college/",
      description: "Digital college notes and study materials platform",
      tag: "Education"
    },
    {
      title: "macOS Portfolio",
      source: "https://github.com/dan10ish/os",
      live: "https://os-danishs-projects-31d8c677.vercel.app/",
      description: "macOS-inspired portfolio website with desktop simulation",
      tag: "Portfolio"
    },
    {
      title: "Comment Toxicity",
      source: "https://github.com/dan10ish/CommentToxicity",
      live: null,
      description: "Machine learning model to detect toxic comments using NLP",
      tag: "ML"
    },
    {
      title: "Terminal Hacker",
      source: "https://github.com/dan10ish/Unity-Terminal_Hacker",
      live: null,
      description: "Terminal-based hacking simulation game built in Unity",
      tag: "Game"
    },
    {
      title: "Office",
      source: "https://github.com/dan10ish/Office",
      live: "https://dan10ish.github.io/Office/",
      description: "Web-based office suite with document editing capabilities",
      tag: "Web"
    },
    {
      title: "Cube Runner",
      source: "https://github.com/dan10ish/Unity-ProjectRun",
      live: null,
      description: "3D endless runner game with cube mechanics in Unity",
      tag: "Game"
    },
    {
      title: "Galaxy",
      source: "https://github.com/dan10ish/Galaxy",
      live: "https://dan10ish.github.io/Galaxy/",
      description: "Interactive galaxy simulation with particle systems",
      tag: "Simulation"
    },
    {
      title: "Personal Website",
      source: "https://github.com/dan10ish/dan10ish.github.io",
      live: "https://dan10ish.github.io",
      description: "Personal portfolio website showcasing projects and skills",
      tag: "Portfolio"
    }
  ]
} as const;
