import React from "react";
import { useThemeContext } from "../context/themeContext";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  return (
    <div
      className={`App ${
        theme == "dark" ? "dark" : ""
      } transition-all ease-in-out duration-1000 bg min-w-full  min-h-screen h-full`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
