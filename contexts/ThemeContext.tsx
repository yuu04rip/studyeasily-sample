'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeColor, ThemeConfig } from '@/types';

interface ThemeContextType {
  currentTheme: ThemeColor;
  setTheme: (theme: ThemeColor) => void;
  themeConfig: ThemeConfig;
}

const themeConfigs: Record<ThemeColor, ThemeConfig> = {
  purple: {
    name: 'Purple',
    primary: '#9B6BFF',
    secondary: '#FF66D7',
    accent: '#35D6C6',
    gradientStart: '#3b2863',
    gradientEnd: '#5a37a6',
    bgDark: '#2f1b4a',
    bgMid: '#3b2863',
    bg: '#5a37a6',
  },
  orange: {
    name: 'Orange',
    primary: '#FF8C42',
    secondary: '#FF6B35',
    accent: '#FFD23F',
    gradientStart: '#6B3410',
    gradientEnd: '#A55028',
    bgDark: '#4A2108',
    bgMid: '#6B3410',
    bg: '#A55028',
  },
  green: {
    name: 'Green',
    primary: '#4ECDC4',
    secondary: '#44A08D',
    accent: '#95E1D3',
    gradientStart: '#1A4D2E',
    gradientEnd: '#2D6A4F',
    bgDark: '#0F2F1C',
    bgMid: '#1A4D2E',
    bg: '#2D6A4F',
  },
  red: {
    name: 'Red',
    primary: '#EF476F',
    secondary: '#C1121F',
    accent: '#FF6B9D',
    gradientStart: '#590D22',
    gradientEnd: '#800F2F',
    bgDark: '#3D0814',
    bgMid: '#590D22',
    bg: '#800F2F',
  },
  black: {
    name: 'Black',
    primary: '#6C757D',
    secondary: '#495057',
    accent: '#ADB5BD',
    gradientStart: '#212529',
    gradientEnd: '#343A40',
    bgDark: '#0D0D0D',
    bgMid: '#212529',
    bg: '#343A40',
  },
  blue: {
    name: 'Blue',
    primary: '#4A90E2',
    secondary: '#2E5C8A',
    accent: '#87CEEB',
    gradientStart: '#1A3A52',
    gradientEnd: '#2E5C8A',
    bgDark: '#0F2537',
    bgMid: '#1A3A52',
    bg: '#2E5C8A',
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme from localStorage immediately or use default
  const [currentTheme, setCurrentTheme] = useState<ThemeColor>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('dashboardTheme') as ThemeColor;
      if (savedTheme && themeConfigs[savedTheme]) {
        return savedTheme;
      }
    }
    return 'purple';
  });

  // Apply theme CSS variables immediately on mount and whenever theme changes
  useEffect(() => {
    const config = themeConfigs[currentTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--theme-primary', config.primary);
    root.style.setProperty('--theme-secondary', config.secondary);
    root.style.setProperty('--theme-accent', config.accent);
    root.style.setProperty('--theme-gradient-start', config.gradientStart);
    root.style.setProperty('--theme-gradient-end', config.gradientEnd);
    root.style.setProperty('--theme-bg-dark', config.bgDark);
    root.style.setProperty('--theme-bg-mid', config.bgMid);
    root.style.setProperty('--theme-bg', config.bg);
  }, [currentTheme]);

  const setTheme = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    localStorage.setItem('dashboardTheme', theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeConfig: themeConfigs[currentTheme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { themeConfigs };
