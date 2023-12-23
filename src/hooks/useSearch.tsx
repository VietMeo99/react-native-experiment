import {useContext} from 'react';

import {SearchContext} from 'contexts/SearchContext';

export default function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('Search context hook is not used correctly');
  }

  return context;
}
