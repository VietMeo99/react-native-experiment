import React, {FC, PropsWithChildren, createContext, useState} from 'react';

import useDebounce from 'hooks/useDebounce';

interface SearchContextValues {
  search: string;
  setSearch: (value: string) => void;
}

export const SearchContext = createContext<undefined | SearchContextValues>(
  undefined,
);

const SearchProvider: FC<PropsWithChildren<object>> = ({children}) => {
  const [search, setSearch] = useState<string>('');
  const value = useDebounce(search);

  return (
    <SearchContext.Provider
      value={{
        search: value as string,
        setSearch,
      }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
