export type ProjectTag =
  | "algorithm"
  | "machine learning"
  | "web"
  | "robotics"
  | "college"
  | "game";

export interface Project {
  id: string;
  name: string;
  tag: ProjectTag;
  sourceCode?: string;
  liveDemo?: string;
}

export const projects: Project[] = [
  {
    id: "algosim",
    name: "AlgoSim",
    tag: "algorithm",
    sourceCode: "https://github.com/dan10ish/AlgoSim",
  },
  {
    id: "cognicart",
    name: "CogniCart",
    tag: "machine learning",
    sourceCode: "https://github.com/dan10ish/cogni-cart",
  },
  {
    id: "code",
    name: "Code",
    tag: "web",
    sourceCode: "https://github.com/dan10ish/code",
    liveDemo: "https://dan10ish.github.io/code",
  },
  {
    id: "3dof",
    name: "3DOF Robotic Arm",
    tag: "robotics",
    sourceCode: "https://github.com/dan10ish/3DOF-RoboticArm-C",
  },
  {
    id: "pathfinder",
    name: "Pathfinder",
    tag: "algorithm",
    sourceCode: "https://github.com/dan10ish/pathfinding-visualizer",
    liveDemo: "https://dan10ish.github.io/pathfinding-visualizer/",
  },
  {
    id: "macos-portfolio",
    name: "macOS Portfolio",
    tag: "web",
    sourceCode: "https://github.com/dan10ish/os",
    liveDemo: "https://os-danishs-projects-31d8c677.vercel.app/",
  },
  {
    id: "arm-visualizer",
    name: "Arm Visualizer",
    tag: "robotics",
    sourceCode: "https://github.com/dan10ish/RoboticArm",
    liveDemo: "https://dan10ish.github.io/RoboticArm/",
  },
  {
    id: "college-notes",
    name: "College Notes",
    tag: "college",
    sourceCode: "https://github.com/dan10ish/college",
    liveDemo: "https://dan10ish.github.io/college/",
  },
  {
    id: "comment-toxicity",
    name: "Comment Toxicity",
    tag: "machine learning",
    sourceCode: "https://github.com/dan10ish/CommentToxicity",
  },
  {
    id: "terminal-hacker",
    name: "Terminal Hacker",
    tag: "game",
    sourceCode: "https://github.com/dan10ish/Unity-Terminal_Hacker",
  },
  {
    id: "office",
    name: "Office",
    tag: "game",
    sourceCode: "https://github.com/dan10ish/Office",
    liveDemo: "https://dan10ish.github.io/Office/",
  },
  {
    id: "cube-runner",
    name: "Cube Runner",
    tag: "game",
    sourceCode: "https://github.com/dan10ish/Unity-ProjectRun",
  },
  {
    id: "galaxy",
    name: "Galaxy",
    tag: "web",
    sourceCode: "https://github.com/dan10ish/Galaxy",
    liveDemo: "https://dan10ish.github.io/Galaxy/",
  },
  {
    id: "personal-website",
    name: "Personal Website",
    tag: "web",
    sourceCode: "https://github.com/dan10ish/dan10ish.github.io",
    liveDemo: "https://dan10ish.github.io",
  },
];
