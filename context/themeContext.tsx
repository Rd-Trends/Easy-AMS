import React from "react";
import { createContext, useContext, useEffect } from "react";
import useLocalStorage from "use-local-storage";

interface themeContextInterface {
  theme: string;
  switchTheme: () => void;
}

const ThemeContext = createContext<themeContextInterface | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage("theme", "");

  useEffect(() => {
    console.log(theme);
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
