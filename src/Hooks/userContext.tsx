/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState, useEffect, useCallback } from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../api'
import { useNavigate } from 'react-router-dom';

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

const UserStorage = ({ children }: React.PropsWithChildren) => {
  const [data, setData] = useState<User | null>(null)
  const [login, setLogin] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState<string | null>(null)


  const userLogout = useCallback(async () => {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem('token');
  }, [])


  const getUser = async (token: string) => {
    const { url, options } = USER_GET(token)
    const user = await (await fetch(url, options)).json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setData(user);
    setLogin(true);
  }


  const userLogin = async (username: string, password: string) => {
    try {
      setError(null)
      setLoading(true)
      const { url, options } = TOKEN_POST({ username, password })
      const response = (await fetch(url, options))
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const { token } = await response.json()
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/conta')
    } catch (err) {
      setError('Senha ou usuário incorreto')
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const autoLogin = async () => {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error('Token Inválido');
          }
          await getUser(token);
        } catch (error) {
          userLogout()
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false)
      }
    };
    autoLogin();
  }, [userLogout]);



  return (<UserContext.Provider value={{ userLogin, getUser, user: data, loading, login, error, userLogout }}>{children}</UserContext.Provider>)

}


export { UserStorage }