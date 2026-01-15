// Centralized data exports for the mini OS
import userData from './userData.json';
import appsConfig from './appsConfig.json';
import fileSystem from './fileSystem.json';
import experienceData from './experienceData.json';
import projectsData from './projectsData.json';

// Re-export all data
export { userData, appsConfig, fileSystem, experienceData, projectsData };

// Helper functions
export const getUserProfile = () => userData.profile;
export const getUserContact = () => userData.contact;
export const getUserSocials = () => userData.socials;
export const getCardData = () => userData.card;
export const getTerminalConfig = () => userData.terminal;

export const getAppsConfig = () => appsConfig.apps;
export const getAppById = (id) => appsConfig.apps.find(app => app.id === id);
export const getAppsByCategory = (category) => appsConfig.apps.filter(app => app.category === category);
export const getResponsiveScales = () => appsConfig.responsiveScales;

export const getFileSystem = () => fileSystem;
export const getExperience = () => experienceData.experience;
export const getEducation = () => experienceData.education;
export const getProjects = () => projectsData.projects;

// Default export with all data
export default {
    userData,
    appsConfig,
    fileSystem,
    experienceData,
    projectsData
};
