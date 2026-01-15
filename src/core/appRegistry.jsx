import React from 'react';
import { getAppsConfig, getResponsiveScales } from '../data/index.js';
import { getResponsiveSize } from '../hooks/useOS';

// Import app components
import About from '../apps/About/About';
import Experience from '../apps/Experience/Experience';
import Projects from '../apps/Projects/Projects';
import MusicPlayer from '../apps/MusicPlayer/MusicPlayer';
import Terminal from '../apps/Terminal/Terminal';
import Card from '../apps/Card/Card';

// Import icons
import aboutIcon from '../assets/icons/about.png';
import experienceIcon from '../assets/icons/experience.png';
import developerIcon from '../assets/icons/developer.png';
import musicIcon from '../assets/icons/listen.png';
import terminalIcon from '../assets/icons/terminal.png';
import cardIcon from '../assets/icons/contacts.png';

// Map of app IDs to components
const componentMap = {
    about: About,
    experience: Experience,
    projects: Projects,
    'music-player': MusicPlayer,
    terminal: Terminal,
    card: Card
};

// Map of app IDs to icons
const iconMap = {
    about: aboutIcon,
    experience: experienceIcon,
    projects: developerIcon,
    'music-player': musicIcon,
    terminal: terminalIcon,
    card: cardIcon
};

// Special sizing for Card app
const getCardResponsiveSize = () => {
    if (typeof window === 'undefined') return [480, 300];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth < 768) {
        return [screenWidth * 0.92, Math.min(screenHeight * 0.6, 400)];
    } else if (screenWidth < 1024) {
        return [screenWidth * 0.85, Math.min(screenHeight * 0.55, 450)];
    } else if (screenWidth < 1440) {
        return [Math.min(800, screenWidth * 0.55), Math.min(550, screenHeight * 0.6)];
    } else if (screenWidth < 1920) {
        return [Math.min(900, screenWidth * 0.5), Math.min(600, screenHeight * 0.6)];
    } else {
        return [Math.min(1000, screenWidth * 0.45), Math.min(650, screenHeight * 0.55)];
    }
};

// Get app configuration with proper component and sizing
export const getApps = (onOpenWindow) => {
    const appsConfig = getAppsConfig();
    const responsiveScales = getResponsiveScales();

    return appsConfig.map(appConfig => {
        const Component = componentMap[appConfig.id];
        const icon = iconMap[appConfig.id];

        // Calculate responsive size
        let defaultSize;
        if (appConfig.id === 'card') {
            defaultSize = getCardResponsiveSize();
        } else if (appConfig.id === 'music-player') {
            // Fixed size for music player
            defaultSize = [250, 280];
        } else {
            defaultSize = getResponsiveSize(
                appConfig.defaultSize.width,
                appConfig.defaultSize.height,
                responsiveScales
            );
        }

        // Create component with props if needed
        const needsOnOpenWindow = ['experience', 'projects'].includes(appConfig.id);
        const component = needsOnOpenWindow
            ? <Component onOpenWindow={onOpenWindow} />
            : <Component />;

        return {
            id: appConfig.id,
            name: appConfig.name,
            icon,
            component,
            defaultSize,
            category: appConfig.category,
            touchOptimized: appConfig.touchOptimized,
            description: appConfig.description
        };
    });
};

// Get a single app by ID
export const getAppById = (id, onOpenWindow) => {
    const apps = getApps(onOpenWindow);
    return apps.find(app => app.id === id);
};

// Get apps by category
export const getAppsByCategory = (category, onOpenWindow) => {
    const apps = getApps(onOpenWindow);
    return apps.filter(app => app.category === category);
};

// Register a new app dynamically (for future extensibility)
export const registerApp = (appConfig, Component) => {
    componentMap[appConfig.id] = Component;
    // Note: Icon would need to be imported or provided as URL
};

export default { getApps, getAppById, getAppsByCategory, registerApp };
