import {useContext} from 'react';

import {HeaderContext} from 'contexts/HeaderContext';

export default function useHeader() {
  const context = useContext(HeaderContext);

  if (!context) {
    throw new Error('Header context hook is not used correctly');
  }

  return context;
}
