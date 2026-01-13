import React from "react";

import About from "./About/About";
import Experience from "./Experience/Experience";
import Projects from "./Projects/Projects";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import Terminal from "./Terminal/Terminal";
import Card from "./Card/Card";

import aboutIcon from "../assets/icons/about.png";
import musicIcon from "../assets/icons/listen.png";
import experienceIcon from "../assets/icons/experience.png";
import developerIcon from "../assets/icons/developer.png";
import terminalIcon from "../assets/icons/terminal.png";
import cardIcon from "../assets/icons/contacts.png";

const RESPONSIVE_WINDOW_SIZES = {
  largeScreens: 0.5,
  desktopScreens: 0.55,
  mediumScreens: 0.65,
  tabletScreens: 0.75,
  mobileScreens: 0.5
};

const getResponsiveSize = (baseWidth, baseHeight) => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  let scaleFactor;
  if (screenWidth >= 1920) {
    scaleFactor = RESPONSIVE_WINDOW_SIZES.largeScreens;
  } else if (screenWidth >= 1440) {
    scaleFactor = RESPONSIVE_WINDOW_SIZES.desktopScreens;
  } else if (screenWidth >= 1024) {
    scaleFactor = RESPONSIVE_WINDOW_SIZES.mediumScreens;
  } else if (screenWidth >= 768) {
    scaleFactor = RESPONSIVE_WINDOW_SIZES.tabletScreens;
  } else {
    scaleFactor = RESPONSIVE_WINDOW_SIZES.mobileScreens;
  }

  return [
    Math.max(280, Math.min(baseWidth * scaleFactor, screenWidth * 0.9)),
    Math.max(200, Math.min(baseHeight * scaleFactor, screenHeight * 0.8))
  ];
};

export const getApps = (onOpenWindow) => [
  {
    id: "about",
    name: "About",
    icon: aboutIcon,
    component: <About />,
    defaultSize: getResponsiveSize(800, 600),
  },
  {
    id: "experience",
    name: "Experience",
    icon: experienceIcon,
    component: <Experience onOpenWindow={onOpenWindow} />,
    defaultSize: getResponsiveSize(900, 600),
  },
  {
    id: "projects",
    name: "Projects",
    icon: developerIcon,
    component: <Projects onOpenWindow={onOpenWindow} />,
    defaultSize: getResponsiveSize(1000, 700),
  },
  {
    id: "music-player",
    name: "Listen",
    icon: musicIcon,
    component: <MusicPlayer />,
    defaultSize: [250, 280],
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: terminalIcon,
    component: <Terminal />,
    defaultSize: getResponsiveSize(1000, 700),
  },
  {
    id: "card",
    name: "Card",
    icon: cardIcon,
    component: <Card />,
    defaultSize: getResponsiveSize(700, 500),
  },
];

export const apps = getApps();
