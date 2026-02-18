import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Get theme from local storage or default to 'dark'
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Get font size from local storage or default to 'medium'
  const [fontSize, setFontSizeState] = useState(() => {
    return localStorage.getItem("fontSize") || "medium";
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const setFontSize = (newSize) => {
    setFontSizeState(newSize);
    localStorage.setItem("fontSize", newSize);
  };

  useEffect(() => {
    const root = document.documentElement;
    // Remove both explicitly to ensure clean slate
    root.classList.remove("light", "dark");

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const activeTheme = theme === "system" ? systemTheme : theme;

    // Add the theme class. For 'dark', we might stick to root variables or explicit class.
    root.classList.add(activeTheme);

    // Also set a data attribute for flexibility
    root.setAttribute("data-theme", activeTheme);

  }, [theme]);

  // Handle Font Size Effect
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </ThemeContext.Provider>
  );
};
