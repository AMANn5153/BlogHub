import React, { useState, createContext, useContext } from "react";

const ThemeContext = createContext();

export const useThemeContext = () => {
    return useContext(ThemeContext);
}

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;