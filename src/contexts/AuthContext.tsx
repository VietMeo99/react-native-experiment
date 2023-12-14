import React, {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Splash from 'screens/Splash';
import {tokenManager} from 'utils/tokenManager';
import {AsyncStorageKey} from 'constants/async-storage';
import {logoutApi} from 'apis/auth.api';

interface AuthContextValues {
  token: string;
  refresh: string;
  setToken: (token: string, refresh: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<undefined | AuthContextValues>(
  undefined,
);

const AuthProvider: FC<PropsWithChildren<object>> = ({children}) => {
  const [token, setToken] = useState<string>('');
  const [refresh, setRefreshToken] = useState<string>('');
  const [init, setInit] = useState<boolean>(false);

  const handleSetToken = useCallback((t: string, rT: string) => {
    AsyncStorage.setItem(AsyncStorageKey.token, t);
    AsyncStorage.setItem(AsyncStorageKey.refreshToken, t);
    tokenManager.setToken(t, rT);
    setToken(t);
    setRefreshToken(rT);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logoutApi();
    } catch (e) {
      // TODO: Show Error
    } finally {
      AsyncStorage.removeItem(AsyncStorageKey.token);
      AsyncStorage.removeItem(AsyncStorageKey.refreshToken);
      tokenManager.setToken('', '');
      setToken('');
      setRefreshToken('');
    }
  }, []);

  const initSession = useCallback(() => {
    AsyncStorage.getItem(AsyncStorageKey.token)
      .then(value => {
        handleSetToken(value || '', '');
      })
      .finally(() => {
        setInit(true);
      });
  }, [handleSetToken]);

  useEffect(() => {
    initSession();
    tokenManager.setLogoutMethod(handleLogout);
  }, [handleLogout, initSession]);

  return (
    <AuthContext.Provider
      value={{
        token,
        refresh,
        setToken: handleSetToken,
        logout: handleLogout,
      }}>
      {!init ? <Splash /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
