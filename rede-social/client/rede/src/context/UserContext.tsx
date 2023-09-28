"use client"

import {createContext, useState} from 'react'

interface ContextProps{
    children: React.ReactNode;
}

interface User{
    user: 
    |
    {
        id: number;
        email: string;
        username: string;
        userImg: string;
        bgImg: string;
    }
    | undefined;
    setUser: (newState: any) => void;   
}

const initialValue = {
    user: undefined,
    setUser: ()=> {},
}

export const UserContext = createContext<User>(initialValue)

export const UserContextProvider = ({children}: ContextProps) =>{
    let UserJSON = localStorage.getItem("rede: user")
    const [user, setUser] = useState(
        UserJSON? JSON.parse(UserJSON): initialValue.user
    )
    return(
        <UserContext.Provider value={{
            user,
            setUser
        }}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContext;