import React, { useState, useEffect, useContext } from "react";
import HoverImg from "./HoverImg";
import "./DarkMode.css";

import { ThemeContext } from "../App";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    setTheme(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="toggle-container" onClick={() => setIsDarkMode(!isDarkMode)}>
      <span>
        {isDarkMode ? (
          <HoverImg imgSrc="sun" class="DarkMode-icon" />
        ) : (
          <HoverImg imgSrc="moon" class="DarkMode-icon" />
        )}
      </span>
    </div>
  );
};

export default DarkMode;
