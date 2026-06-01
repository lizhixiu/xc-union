import { createContext, useContext, useState, lazy } from 'react';
import themes, { getDefaultTheme } from '../themes';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'xc_union_theme';

function createLazyComponents(themeKey) {
  const themeConfig = themes[themeKey];
  if (!themeConfig?.pages) return null;

  const components = {};
  for (const [name, loadFn] of Object.entries(themeConfig.pages)) {
    components[name] = lazy(loadFn);
  }
  return components;
}

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || getDefaultTheme();
    } catch {
      return getDefaultTheme();
    }
  });

  const [themePages] = useState(() => createLazyComponents(themeKey));

  const switchTheme = (key) => {
    if (!themes[key]) return;
    setThemeKey(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // ignore
    }
    window.location.reload();
  };

  return (
    <ThemeContext.Provider value={{ themeKey, themePages, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
