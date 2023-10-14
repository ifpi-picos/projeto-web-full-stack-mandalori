"use client"

import {createContext, useEffect, useState} from 'react'

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

// ... (other imports)

export const UserContextProvider = ({ children }: ContextProps) => {
    const [user, setUser] = useState(initialValue.user);
  
    useEffect(() => {
      // Use a callback function to prevent unnecessary renders
      const setUserFromLocalStorage = () => {
        let UserJSON = localStorage.getItem("rede: user");
        setUser(UserJSON && JSON.parse(UserJSON));
      };
  
      setUserFromLocalStorage(); // Initial call
  
      // Make sure to cleanup the effect by removing the listener
      return () => {
        // Cleanup, if necessary
      };
    }, []); // Add an empty dependency array to run the effect only once
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  

export default UserContext;