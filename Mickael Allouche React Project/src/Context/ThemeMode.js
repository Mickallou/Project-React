import React, {useContext, useState, createContext} from 'react'

const ThemeModeContext = createContext()

export const ThemeModeProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <ThemeModeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </ThemeModeContext.Provider>
    )
}

export const useThemeMode = () => {
    return useContext(ThemeModeContext)
}