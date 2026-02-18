import React from "react";
import { useTheme } from "./ThemeContext";
import { Theme } from "./theme.const";
import { Switcher } from "../../common/components/Switcher/Switcher";

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switcher-wrapper">
      <Switcher 
        isChecked={theme === Theme.Dark}
        onChange={toggleTheme}
        labelLeft="☀️ Light"
        labelRight="🌙 Dark"
      />
    </div>
  );
};
