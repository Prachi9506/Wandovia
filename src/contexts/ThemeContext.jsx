
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(); 

const themes = {
  blue: {
    name: 'Ocean Blue',
    primary: '#2563EB',
    secondary: '#0D9488', 
    accent: '#EA580C'
  },
  purple: {
    name: 'Royal Purple',
    primary: '#7C3AED', 
    secondary: '#DB2777',
    accent: '#F59E0B'
  },
  green: {
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#0D9488',
    accent: '#DC2626'
  },
  orange: {
    name: 'Sunset Orange',
    primary: '#EA580C',
    secondary: '#DC2626',
    accent: '#7C3AED'
  },
  pink: {
    name: 'Cherry Blossom',
    primary: '#EC4899',
    secondary: '#8B5CF6',
    accent: '#10B981'
  },
  teal: {
    name: 'Ocean Teal',
    primary: '#0D9488',
    secondary: '#06B6D4',
    accent: '#F59E0B'
  }
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('travel-planner-theme');
    return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedColorTheme = localStorage.getItem('travel-planner-color-theme');
    return savedColorTheme || 'blue';
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = themes[currentTheme];
    
    // Set color theme variables
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    
    // Set dark/light mode
    if (isDarkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    
    localStorage.setItem('travel-planner-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('travel-planner-color-theme', currentTheme);
  }, [isDarkMode, currentTheme]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const setTheme = (themeId) => {
    setCurrentTheme(themeId);
  };

  return (
    <ThemeContext.Provider value={{ 
      isDarkMode, 
      toggleTheme, 
      currentTheme, 
      setTheme, 
      themes 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
