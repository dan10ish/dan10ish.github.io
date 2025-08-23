import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Loader2 } from "lucide-react";
import MenuBar from "./components/MenuBar/MenuBar";
import Desktop from "./components/Desktop/Desktop";
import Window from "./components/Window/Window";
import { StartupScreen, LoadingScreen } from "./components/Startup";
import { getApps } from "./apps/apps.jsx";
import wallpaper from "./assets/wallpaper.png";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

const App = () => {
  const [startupPhase, setStartupPhase] = useState("startup");
  const [openApps, setOpenApps] = useState({});
  const [focusOrder, setFocusOrder] = useState([]);
  const [loadingApps, setLoadingApps] = useState({});

  const handleOpenWindow = useCallback((windowConfig) => {
    const appId = windowConfig.id;
    if (openApps[appId]) {
      handleFocusApp(appId);
      if (openApps[appId].state === "minimized") {
        setOpenApps((prev) => ({
          ...prev,
          [appId]: { ...prev[appId], state: "open" },
        }));
      }
      return;
    }

    setLoadingApps(prev => ({ ...prev, [appId]: true }));
    
    setTimeout(() => {
      setOpenApps((prev) => ({
        ...prev,
        [appId]: { config: windowConfig, state: "open" },
      }));
      setFocusOrder((prev) => [...prev.filter((id) => id !== appId), appId]);
      setLoadingApps(prev => ({ ...prev, [appId]: false }));
    }, 50);
  }, [openApps]);

  const apps = useMemo(() => getApps(handleOpenWindow), [handleOpenWindow]);

  const handleOpenApp = useCallback((appId) => {
    if (openApps[appId]) {
      handleFocusApp(appId);
      if (openApps[appId].state === "minimized") {
        setOpenApps((prev) => ({
          ...prev,
          [appId]: { ...prev[appId], state: "open" },
        }));
      }
      return;
    }

    setLoadingApps(prev => ({ ...prev, [appId]: true }));
    
    const appConfig = apps.find((app) => app.id === appId);
    if (appConfig) {
      setTimeout(() => {
        setOpenApps((prev) => ({
          ...prev,
          [appId]: { config: appConfig, state: "open" },
        }));
        setFocusOrder((prev) => [...prev.filter((id) => id !== appId), appId]);
        setLoadingApps(prev => ({ ...prev, [appId]: false }));
      }, 50);
    }
  }, [openApps, apps]);

  const handleCloseApp = useCallback((appId) => {
    setOpenApps((prev) => {
      const newApps = { ...prev };
      delete newApps[appId];
      return newApps;
    });
    setFocusOrder((prev) => prev.filter((id) => id !== appId));
    setLoadingApps(prev => {
      const newLoading = { ...prev };
      delete newLoading[appId];
      return newLoading;
    });
  }, []);

  const handleMinimizeApp = useCallback((appId) => {
    setOpenApps((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], state: "minimized" },
    }));
    setFocusOrder((prev) => [...prev.filter((id) => id !== appId)]);
  }, []);

  const handleMaximizeApp = useCallback((appId) => {
    setOpenApps((prev) => ({
      ...prev,
      [appId]: { 
        ...prev[appId], 
        state: prev[appId].state === "maximized" ? "open" : "maximized" 
      },
    }));
  }, []);

  const handleFocusApp = useCallback((appId) => {
    if (focusOrder[focusOrder.length - 1] !== appId) {
      setFocusOrder((prev) => [...prev.filter((id) => id !== appId), appId]);
    }
  }, [focusOrder]);

  const openAppEntries = useMemo(() => Object.entries(openApps), [openApps]);

  const handlePowerOn = () => {
    setStartupPhase("loading");
  };

  const handleLoadComplete = () => {
    setStartupPhase("desktop");
  };

  const handleShutdown = () => {
    setOpenApps({});
    setFocusOrder([]);
    setLoadingApps({});
    setStartupPhase("startup");
  };

  if (startupPhase === "startup") {
    return (
      <ThemeProvider>
        <StartupScreen onPowerOn={handlePowerOn} />
      </ThemeProvider>
    );
  }

  if (startupPhase === "loading") {
    return (
      <ThemeProvider>
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
        <MenuBar onShutdown={handleShutdown} />
        <Desktop onOpenApp={handleOpenApp} apps={apps} />
      </div>

      {openAppEntries.map(([appId, appData]) => {
        const appConfig = appData.config;
        const zIndex = focusOrder.indexOf(appId) + 100;
        const isLoading = loadingApps[appId];

        return (
          <Window
            key={appId}
            app={appConfig}
            onClose={() => handleCloseApp(appId)}
            onMinimize={() => handleMinimizeApp(appId)}
            onMaximize={() => handleMaximizeApp(appId)}
            onFocus={() => handleFocusApp(appId)}
            zIndex={zIndex}
            state={appData.state}
          >
            {isLoading ? (
              <div className="loading-container">
                <Loader2 className="loading-spinner" size={24} />
                <span>Loading...</span>
              </div>
            ) : (
              appConfig.component
            )}
          </Window>
        );
      })}
    </ThemeProvider>
  );
};

export default App;
