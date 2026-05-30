import { createContext, useContext, useState, useEffect, Suspense, lazy } from 'react';
import themes, { getDefaultTheme } from '../themes';

const ThemeContext = createContext(null);

const STORAGE_KEY = 'xc_union_theme';

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || getDefaultTheme();
    } catch {
      return getDefaultTheme();
    }
  });

  const [themePages, setThemePages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const themeConfig = themes[themeKey];
    if (!themeConfig) {
      setThemePages(null);
      setLoading(false);
      return;
    }

    themeConfig.load().then((mod) => {
      if (!cancelled) {
        setThemePages(() => mod);
        setLoading(false);
      }
    }).catch(() => {
      if (!cancelled) {
        setThemePages(null);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [themeKey]);

  const switchTheme = (key) => {
    if (!themes[key]) return;
    setThemeKey(key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ themeKey, themePages, loading, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
