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
} as const;
