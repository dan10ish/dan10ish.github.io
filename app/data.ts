export interface Personal {
  name: string;
  title: string[];
  about?: string;
}

export interface Social {
  name: string;
  username: string;
  url: string;
}

export interface Project {
  title: string;
  source: string | null;
  live: string | null;
  description: string;
  tag: string;
}

export interface Data {
  personal: Personal;
  social: Social[];
  projects: Project[];
}

export const data: Data = {
  personal: {
    name: "Danish Ansari",
    title: ["AI", "Robotics", "Finance"],
    about: "Mechatronics engineer and generalist bridging code and hardware.",
  },
  social: [
    {
      name: "Instagram",
      username: "dan10ish",
      url: "https://instagram.com/dan10ish",
    },
    {
      name: "X",
      username: "dan10ish",
      url: "https://x.com/dan10ish",
    },
    {
      name: "Snapchat",
      username: "dan10ish",
      url: "https://snapchat.com/add/dan10ish",
    },
    {
      name: "Email",
      username: "dan10ish",
      url: "mailto:aansaridan@gmail.com",
    },
  ],
  projects: [
    {
      title: "Arm Visualizer",
      source: "https://github.com/dan10ish/RoboticArm",
      live: "https://dan10ish.github.io/RoboticArm/",
      description: "3D arm movement simulator",
      tag: "Robotics"
    },
    {
      title: "3DOF Robotic Arm",
      source: "https://github.com/dan10ish/3DOF-RoboticArm-C",
      live: null,
      description: "C-based 3DOF arm controller",
      tag: "Robotics"
    },
    {
      title: "Pathfinder",
      source: "https://github.com/dan10ish/pathfinding-visualizer",
      live: "https://dan10ish.github.io/pathfinding-visualizer/",
      description: "Algorithm path visualization",
      tag: "Algorithm"
    },
    {
      title: "Office",
      source: "https://github.com/dan10ish/Office",
      live: "https://dan10ish.github.io/Office/",
      description: "3D office visualization",
      tag: "Web"
    },
    {
      title: "Galaxy",
      source: "https://github.com/dan10ish/Galaxy",
      live: "https://dan10ish.github.io/Galaxy/",
      description: "Particle-based galaxy sim",
      tag: "Simulation"
    },
    {
      title: "macOS",
      source: "https://github.com/dan10ish/os",
      live: "https://os-danishs-projects-31d8c677.vercel.app/",
      description: "macOS style portfolio",
      tag: "Web"
    },
    {
      title: "Code Editor",
      source: "https://github.com/dan10ish/code",
      live: "http://dan10ish.github.io/code",
      description: "Browser code editor",
      tag: "Web"
    },
    {
      title: "College Notes",
      source: "https://github.com/dan10ish/college",
      live: "https://dan10ish.github.io/college/",
      description: "Mechatronics engineering notes",
      tag: "Education"
    },
    {
      title: "AlgoSim",
      source: "https://github.com/dan10ish/AlgoSim",
      live: null,
      description: "Real-time trading simulation",
      tag: "ML"
    },
    {
      title: "CogniCart",
      source: "https://github.com/dan10ish/cogni-cart",
      live: null,
      description: "AI shopping recommendations",
      tag: "ML"
    },
    {
      title: "Comment Toxicity",
      source: "https://github.com/dan10ish/CommentToxicity",
      live: null,
      description: "NLP toxicity detection",
      tag: "ML"
    },
    {
      title: "Terminal",
      source: "https://github.com/dan10ish/Unity-Terminal_Hacker",
      live: null,
      description: "Unity hacking game",
      tag: "Game"
    },
    {
      title: "Cube",
      source: "https://github.com/dan10ish/Unity-ProjectRun",
      live: null,
      description: "3D endless runner game",
      tag: "Game"
    }
  ]
};
