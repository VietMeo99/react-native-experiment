import {createContext, useContext} from 'react';

// import { AuthContext } from 'contexts/AuthContext';

export interface AuthContextValues {
  token: string;
  // refresh: string;
  // setToken: (token: string, refresh: string) => void;
  // logout: () => void;
}

export default function useAuth() {
  const context = useContext(
    createContext<undefined | AuthContextValues>({token: ''}),
  );
  // const context = useContext(AuthContext);

  // if (!context) {
  //   throw new Error('Auth context hook is not used correctly');
  // }

  return context;
}
