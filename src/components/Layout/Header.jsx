import React from 'react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, MapPin, Palette, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
  const { isDarkMode, toggleTheme, currentTheme, setTheme, themes } = useTheme();
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const handleThemeSelect = (themeId) => {
    setTheme(themeId);
    setShowThemeDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <MapPin size={24} />
            <h1>Wandovia</h1>
            <a href="https://green-voyage.vercel.app/"><h1>TravelPlanner</h1></a>
          </div>
        </div>
        
        <div className="header-right">
          <div className="theme-selector">
            <button 
              className="theme-dropdown-btn"
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              aria-label="Select theme"
            >
              <Palette size={20} />
              <ChevronDown size={16} />
            </button>
            
            <div className={`theme-dropdown ${showThemeDropdown ? 'open' : ''}`}>
              {Object.entries(themes).map(([themeId, theme]) => (
                <div
                  key={themeId}
                  className={`theme-option ${currentTheme === themeId ? 'active' : ''}`}
                  onClick={() => handleThemeSelect(themeId)}
                >
                  <div 
                    className="theme-color-preview"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <span>{theme.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
