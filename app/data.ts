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

export interface Data {
  personal: Personal;
  social: Social[];
}

export const data: Data = {
  personal: {
    name: "Danish Ansari",
    title: ["AI", "Robotics", "Finance"],
    about: "Mechatronics engineer bridging code and hardware.",
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
};
