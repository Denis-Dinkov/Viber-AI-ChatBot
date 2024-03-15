import { useState } from "react";

const useTheme = () => {
  const [currentTheme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const toggleTheme = () => {
    localStorage.setItem("theme", currentTheme === "light" ? "dark" : "light");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return [currentTheme, toggleTheme];
};

export default useTheme;
