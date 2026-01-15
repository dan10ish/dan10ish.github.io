import { useState, useCallback, useMemo } from 'react';

// Device detection utilities
export const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

export const getDeviceType = () => {
    if (typeof window === 'undefined') return 'desktop';
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
};

// Responsive size calculator for apps
export const getResponsiveSize = (baseWidth, baseHeight, responsiveScales) => {
    if (typeof window === 'undefined') return [baseWidth, baseHeight];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const deviceType = getDeviceType();

    // Mobile-first sizing with generous touch targets
    if (deviceType === 'mobile') {
        return [
            Math.min(screenWidth * 0.95, screenWidth - 16),
            Math.min(screenHeight * 0.85, screenHeight - 80)
        ];
    }

    // Tablet sizing
    if (deviceType === 'tablet') {
        return [
            Math.min(baseWidth * 0.8, screenWidth * 0.9),
            Math.min(baseHeight * 0.8, screenHeight * 0.8)
        ];
    }

    // Desktop sizing based on screen size
    let scaleFactor = 0.5;
    if (responsiveScales) {
        const sortedScales = Object.values(responsiveScales).sort((a, b) => b.minWidth - a.minWidth);
        for (const scaleConfig of sortedScales) {
            if (screenWidth >= scaleConfig.minWidth) {
                scaleFactor = scaleConfig.scale;
                break;
            }
        }
    }

    return [
        Math.max(280, Math.min(baseWidth * scaleFactor, screenWidth * 0.9)),
        Math.max(200, Math.min(baseHeight * scaleFactor, screenHeight * 0.8))
    ];
};

// Main OS hook for window management
export const useOS = () => {
    const [openApps, setOpenApps] = useState({});
    const [focusOrder, setFocusOrder] = useState([]);
    const [loadingApps, setLoadingApps] = useState({});
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    });

    const openApp = useCallback((appConfig) => {
        const appId = appConfig.id;

        if (openApps[appId]) {
            // Focus existing app
            setFocusOrder(prev => [...prev.filter(id => id !== appId), appId]);
            if (openApps[appId].state === 'minimized') {
                setOpenApps(prev => ({
                    ...prev,
                    [appId]: { ...prev[appId], state: 'open' }
                }));
            }
            return;
        }

        setLoadingApps(prev => ({ ...prev, [appId]: true }));

        // Slight delay for loading animation
        setTimeout(() => {
            setOpenApps(prev => ({
                ...prev,
                [appId]: { config: appConfig, state: 'open' }
            }));
            setFocusOrder(prev => [...prev.filter(id => id !== appId), appId]);
            setLoadingApps(prev => ({ ...prev, [appId]: false }));
        }, 50);
    }, [openApps]);

    const closeApp = useCallback((appId) => {
        setOpenApps(prev => {
            const newApps = { ...prev };
            delete newApps[appId];
            return newApps;
        });
        setFocusOrder(prev => prev.filter(id => id !== appId));
        setLoadingApps(prev => {
            const newLoading = { ...prev };
            delete newLoading[appId];
            return newLoading;
        });
    }, []);

    const minimizeApp = useCallback((appId) => {
        setOpenApps(prev => ({
            ...prev,
            [appId]: { ...prev[appId], state: 'minimized' }
        }));
        setFocusOrder(prev => prev.filter(id => id !== appId));
    }, []);

    const maximizeApp = useCallback((appId) => {
        setOpenApps(prev => ({
            ...prev,
            [appId]: {
                ...prev[appId],
                state: prev[appId].state === 'maximized' ? 'open' : 'maximized'
            }
        }));
    }, []);

    const focusApp = useCallback((appId) => {
        setFocusOrder(prev => {
            if (prev[prev.length - 1] === appId) return prev;
            return [...prev.filter(id => id !== appId), appId];
        });
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const isDark = prev === 'dark' || (prev === 'system' &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
            const newTheme = isDark ? 'light' : 'dark';

            const root = document.documentElement;
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            return newTheme;
        });
    }, []);

    return useMemo(() => ({
        // State
        openApps,
        focusOrder,
        loadingApps,
        theme,

        // Actions
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        focusApp,
        toggleTheme,

        // Utilities
        isTouchDevice: isTouchDevice(),
        deviceType: getDeviceType()
    }), [openApps, focusOrder, loadingApps, theme, openApp, closeApp, minimizeApp, maximizeApp, focusApp, toggleTheme]);
};

export default useOS;
