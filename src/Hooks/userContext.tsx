/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useState } from 'react'
import { TOKEN_POST, USER_GET } from '../api'
import React from 'react';

interface IUserStorage {
  children: ReactNode
}

export type User = {
  id: number;
  email: string;
  nome: string;
  username: string;
}
interface IUserContext {
  userLogin: (username: string, password: string) => Promise<void>;
  getUser: (token: string) => Promise<void>;
  user: User | null;
  userLogout?: () => void;
  error: string | null;
  loading: boolean;
  login: boolean;
}

export const UserContext = createContext({} as IUserContext);
export const useUserContext = () => React.useContext(UserContext);

const UserStorage = ({ children }: IUserStorage) => {
  const [data, setData] = useState<User | null>(null)
  const [login, setLogin] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState<string | null>(null)


  const getUser = async (token: string) => {
    const { url, options } = USER_GET(token)
    const user = await (await fetch(url, options)).json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setData(user);
    setLogin(true);
  }


  const userLogin = async (username: string, password: string) => {
    const { url, options } = TOKEN_POST({ username, password })
    const response = (await fetch(url, options))
    const { token } = await response.json()
    window.localStorage.setItem('token', token)
    getUser(token)
  }

  return (<UserContext.Provider value={{ userLogin, getUser, user: data, loading, login, error }}>{children}</UserContext.Provider>)

}


export { UserStorage }