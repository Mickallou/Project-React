import React, {useContext, useState, createContext} from 'react'

const IsBusinessContext = createContext()

export const IsBusinessProvider = ({children}) => {
    const [isBusiness, setIsBusiness] = useState(false)

    return (
        <IsBusinessContext.Provider value={{isBusiness, setIsBusiness}}>
            {children}
        </IsBusinessContext.Provider>
    )
}

export const useBusiness = () => {
    return useContext(IsBusinessContext)
}