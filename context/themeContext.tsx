import React from "react";
import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "use-local-storage";

interface themeContextInterface {
  theme: string;
  switchTheme: () => void;
}

const ThemeContext = createContext<themeContextInterface | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<string>("theme", "");

  useEffect(() => {
    const defaultTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (!theme) {
      setTheme(defaultTheme ? "dark" : "white");
    }
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  return {
    theme: themeContext?.theme,
    switchTheme: themeContext?.switchTheme,
  };
};
