import React, {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  ReactNode,
} from 'react';

interface HeaderContextValues {
  buttonRight: () => ReactNode;
  setButtonRight: (value: () => ReactNode) => void;
}

export const HeaderContext = createContext<undefined | HeaderContextValues>(
  undefined,
);

const HeaderProvider: FC<PropsWithChildren<object>> = ({children}) => {
  const [buttonRight, setButtonRight] = useState<() => ReactNode>(() => null);

  return (
    <HeaderContext.Provider
      value={{
        buttonRight,
        setButtonRight,
      }}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderProvider;
