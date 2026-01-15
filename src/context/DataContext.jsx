import React, { createContext, useContext, useMemo } from 'react';
import {
    userData,
    appsConfig,
    fileSystem,
    experienceData,
    projectsData,
    getUserProfile,
    getUserContact,
    getUserSocials,
    getCardData,
    getTerminalConfig,
    getAppsConfig,
    getAppById,
    getAppsByCategory,
    getResponsiveScales,
    getExperience,
    getEducation,
    getProjects
} from '../data/index.js';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const value = useMemo(() => ({
        // Raw data
        userData,
        appsConfig,
        fileSystem,
        experienceData,
        projectsData,

        // Helper functions
        getUserProfile,
        getUserContact,
        getUserSocials,
        getCardData,
        getTerminalConfig,
        getAppsConfig,
        getAppById,
        getAppsByCategory,
        getResponsiveScales,
        getExperience,
        getEducation,
        getProjects,
        getFileSystem: () => fileSystem
    }), []);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

// Main hook to access all data
export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};

// Specific hooks for common use cases
export const useUserData = () => {
    const { getUserProfile, getUserContact, getUserSocials, getCardData, getTerminalConfig } = useData();
    return useMemo(() => ({
        profile: getUserProfile(),
        contact: getUserContact(),
        socials: getUserSocials(),
        card: getCardData(),
        terminal: getTerminalConfig()
    }), [getUserProfile, getUserContact, getUserSocials, getCardData, getTerminalConfig]);
};

export const useApps = () => {
    const { getAppsConfig, getAppById, getAppsByCategory, getResponsiveScales } = useData();
    return useMemo(() => ({
        apps: getAppsConfig(),
        getById: getAppById,
        getByCategory: getAppsByCategory,
        responsiveScales: getResponsiveScales()
    }), [getAppsConfig, getAppById, getAppsByCategory, getResponsiveScales]);
};

export const useExperience = () => {
    const { getExperience, getEducation } = useData();
    return useMemo(() => ({
        experience: getExperience(),
        education: getEducation()
    }), [getExperience, getEducation]);
};

export const useProjects = () => {
    const { getProjects } = useData();
    return useMemo(() => getProjects(), [getProjects]);
};

export const useFileSystem = () => {
    const { getFileSystem } = useData();
    return useMemo(() => getFileSystem(), [getFileSystem]);
};

export default DataContext;
