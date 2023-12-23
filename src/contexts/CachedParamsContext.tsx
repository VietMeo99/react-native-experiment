import React, {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useCallback,
} from 'react';

interface CachedParamsContextValues {
  cachedParams: {[key: string]: any};
  getCachedParams: (key: string) => void;
  setCachedParams: (key: string, params: any) => void;
  resetCachedParams: () => void;
}

export const CachedParamsContext = createContext<
  undefined | CachedParamsContextValues
>(undefined);

const CachedParamsProvider: FC<PropsWithChildren<object>> = ({children}) => {
  const [cachedParams, setCachedParams] = useState<object>({});

  const handleGetCachedParams = useCallback(
    (key: string) => {
      return cachedParams[key];
    },
    [cachedParams],
  );

  const handleSetCachedParams = useCallback((key: string, params: any) => {
    setCachedParams(p => ({...p, [key]: params}));
  }, []);

  const handleResetCachedParams = useCallback(() => {
    setCachedParams({});
  }, []);

  return (
    <CachedParamsContext.Provider
      value={{
        cachedParams,
        getCachedParams: handleGetCachedParams,
        setCachedParams: handleSetCachedParams,
        resetCachedParams: handleResetCachedParams,
      }}>
      {children}
    </CachedParamsContext.Provider>
  );
};

export default CachedParamsProvider;
