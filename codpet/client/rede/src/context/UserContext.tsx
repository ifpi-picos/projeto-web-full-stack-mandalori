"use client"

import {createContext, useEffect, useState} from 'react'

// propriedades esperadas para o contexto
interface ContextProps {
  children: React.ReactNode;
}

// estrutura esperada para representar um usuário no contexto
interface User {
  user:
  | {
      id: number;
      email: string;
      username: string;
      userImg: string;
      bgImg: string;
  }
  | undefined;
  setUser: (newState: any) => void;
}

// valor inicial do contexto
const initialValue: User = {
  user: undefined,
  setUser: () => {},
};

// criação do contexto
export const UserContext = createContext<User>(initialValue);

// provedor do contexto que utiliza o estado local para manter as informações do usuário
export const UserContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(initialValue.user);

  // efeito para carregar o usuário do localStorage ao montar o componente
  useEffect(() => {
      let userJSON = localStorage.getItem("rede: user");
      setUser(userJSON && JSON.parse(userJSON));
  }, []);

  // retorna o provedor do contexto com os valores atuais do usuário e da função setUser
  return (
      <UserContext.Provider value={{ user, setUser }}>
          {children}
      </UserContext.Provider>
  );
};

// exportação do contexto
export default UserContext;