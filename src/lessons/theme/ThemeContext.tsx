import React, { PropsWithChildren } from "react";
import { Theme } from "./theme.const";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
  theme: Theme.Dark,
  toggleTheme: () => {},
};

export const ThemeContext = React.createContext<ThemeContextType>(defaultContextValue);

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = React.useState<Theme>(defaultContextValue.theme);
  const toggleTheme = () => setTheme((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
