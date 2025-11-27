export interface Personal {
  name: string;
  title: string[];
}

export interface Experience {
  company: string;
  year: string;
}

export interface Social {
  name: string;
  username: string;
  url: string;
}

export interface Data {
  personal: Personal;
  experience: Experience[];
  social: Social[];
}

export const data: Data = {
  "personal": {
    "name": "Danish Ansari",
    "title": ["ML", "Robotics", "Finance"]
  },
  "experience": [
    {
      "company": "Innovatio Labs",
      "year": "2025"
    },
    {
      "company": "Cridaa", 
      "year": "2024"
    },
    {
      "company": "Accelus Robotics",
      "year": "2023"
    }
  ],
  "social": [
    {
      "name": "GitHub",
      "username": "dan10ish",
      "url": "https://github.com/dan10ish"
    },
    {
      "name": "Instagram", 
      "username": "dan10ish",
      "url": "https://instagram.com/dan10ish"
    },
    {
      "name": "LinkedIn",
      "username": "dan10ish", 
      "url": "https://linkedin.com/in/dan10ish"
    },
    {
      "name": "X (Twitter)",
      "username": "dan10ish",
      "url": "https://x.com/dan10ish"
    },
    {
      "name": "Email",
      "username": "dan10ish",
      "url": "mailto:aansaridan@gmail.com"
    },
    {
      "name": "Snapchat",
      "username": "dan10ish",
      "url": "https://snapchat.com/add/dan10ish"
    }
  ]
};
  