import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [themeColor, setThemeColor] = useState('#e63946'); // Default red

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Switch Pizza Variant
  const switchVariant = (index, color) => {
    setActiveVariantIndex(index);
    if (color) setThemeColor(color);
  };

  // Apply Theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    root.style.setProperty('--accent-color', themeColor);
  }, [isDarkMode, themeColor]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        activeVariantIndex,
        switchVariant,
        themeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
