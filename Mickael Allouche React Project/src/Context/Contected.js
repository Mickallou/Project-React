import React, {useContext, useState, createContext} from 'react'

const ContectedContext = createContext()

export const ContectedProvider = ({children}) => {
    const [isContected, setIsContected] = useState(false)

    return (
        <ContectedContext.Provider value={{isContected, setIsContected}}>
            {children}
        </ContectedContext.Provider>
    )
}

export const useContected = () => {
    return useContext(ContectedContext)
}