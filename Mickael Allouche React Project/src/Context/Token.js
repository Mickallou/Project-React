import React, {useContext, useState, createContext, useEffect} from 'react'

const TokenContext = createContext()

export const TokenProvider = ({children}) => {
    const [theToken, setTheToken] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            setTheToken(token)}
        }, [token])

    return (
        <TokenContext.Provider value={{theToken, setTheToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useToken = () => {
    return useContext(TokenContext)
}