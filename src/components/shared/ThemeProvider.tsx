import { createContext, useContext, useEffect, useState } from 'react';
import { readSetting, writeSetting } from '@/lib/settings';
type Theme = 'light' | 'dark' | 'system';
const Context = createContext<{
  theme: Theme;
  resolved: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}>({ theme: 'system', resolved: 'light', setTheme: () => {} });
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setValue] = useState<Theme>(() => {
    const saved = readSetting<string>('theme', 'system');
    return ['light', 'dark', 'system'].includes(saved)
      ? (saved as Theme)
      : 'system';
  });
  const [system, setSystem] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setSystem(query.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);
  const resolved = theme === 'system' ? (system ? 'dark' : 'light') : theme;
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark');
  }, [resolved]);
  return (
    <Context.Provider
      value={{
        theme,
        resolved,
        setTheme: (value) => {
          setValue(value);
          writeSetting('theme', value);
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}
export const useTheme = () => useContext(Context);
