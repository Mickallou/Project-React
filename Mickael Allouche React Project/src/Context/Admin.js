import React, {useContext, useState, createContext} from 'react'

const AdminContext = createContext()

export const AdminProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)

    return (
        <AdminContext.Provider value={{isAdmin, setIsAdmin}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => {
    return useContext(AdminContext)
}