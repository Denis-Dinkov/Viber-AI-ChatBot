import { useState } from "react";

const useTheme = () => {
  const [currentTheme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return [currentTheme, toggleTheme];
};

export default useTheme;
