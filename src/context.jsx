import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext();

const getInitialDarkMode = () => {
  const stored = localStorage.getItem("darkMode");
  if (stored !== null) return JSON.parse(stored);
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const INITIAL_STATE = { darkMode: getInitialDarkMode() };

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  }, [state.darkMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
