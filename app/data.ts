export interface Personal {
  name: string;
  title: string[];
}

export interface Social {
  name: string;
  username: string;
  url: string;
}

export interface Project {
  title: string;
  source: string;
  live: string | null;
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
  },
  social: [
    {
      name: "GitHub",
      username: "dan10ish",
      url: "https://github.com/dan10ish",
    },
    {
      name: "Instagram",
      username: "dan10ish",
      url: "https://instagram.com/dan10ish",
    },
    {
      name: "LinkedIn",
      username: "dan10ish",
      url: "https://linkedin.com/in/dan10ish",
    },
    {
      name: "X",
      username: "dan10ish",
      url: "https://x.com/dan10ish",
    },
    {
      name: "Email",
      username: "dan10ish",
      url: "mailto:aansaridan@gmail.com",
    },
    {
      name: "Snapchat",
      username: "dan10ish",
      url: "https://snapchat.com/add/dan10ish",
    },
  ],
  projects: [
    {
      title: "Arm Visualizer",
      source: "https://github.com/dan10ish/RoboticArm",
      live: "https://dan10ish.github.io/RoboticArm/",
    },
    {
      title: "3DOF Robotic Arm",
      source: "https://github.com/dan10ish/3DOF-RoboticArm-C",
      live: null,
    },
    {
      title: "Pathfinder",
      source: "https://github.com/dan10ish/pathfinding-visualizer",
      live: "https://dan10ish.github.io/pathfinding-visualizer/",
    },
    {
      title: "Office",
      source: "https://github.com/dan10ish/Office",
      live: "https://dan10ish.github.io/Office/",
    },
    {
      title: "Galaxy",
      source: "https://github.com/dan10ish/Galaxy",
      live: "https://dan10ish.github.io/Galaxy/",
    },
    {
      title: "macOS",
      source: "https://github.com/dan10ish/os",
      live: "https://os-danishs-projects-31d8c677.vercel.app/",
    },
    {
      title: "Code Editor",
      source: "https://github.com/dan10ish/code",
      live: "http://dan10ish.github.io/code",
    },
    {
      title: "College Notes",
      source: "https://github.com/dan10ish/college",
      live: "https://dan10ish.github.io/college/",
    },
    {
      title: "AlgoSim",
      source: "https://github.com/dan10ish/AlgoSim",
      live: null,
    },
    {
      title: "CogniCart",
      source: "https://github.com/dan10ish/cogni-cart",
      live: null,
    },
    {
      title: "Comment Toxicity",
      source: "https://github.com/dan10ish/CommentToxicity",
      live: null,
    },
    {
      title: "Terminal",
      source: "https://github.com/dan10ish/Unity-Terminal_Hacker",
      live: null,
    },
    {
      title: "Cube",
      source: "https://github.com/dan10ish/Unity-ProjectRun",
      live: null,
    },
  ],
};
