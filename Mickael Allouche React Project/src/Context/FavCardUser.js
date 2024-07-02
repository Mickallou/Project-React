import React, {useContext, useState, createContext} from 'react'

const FavCardUserContext = createContext()

export const FavCardUserProvider = ({children}) => {
    const [favCardUser, setFavCardUser] = useState([])

    return (
        <FavCardUserContext.Provider value={{favCardUser, setFavCardUser}}>
            {children}
        </FavCardUserContext.Provider>
    )
}

export const useFavCardUser = () => {
    return useContext(FavCardUserContext)
}