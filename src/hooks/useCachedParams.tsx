import {useContext} from 'react';

import {CachedParamsContext} from 'contexts/CachedParamsContext';

export default function useCachedParams() {
  const context = useContext(CachedParamsContext);

  if (!context) {
    throw new Error('Cached Params context hook is not used correctly');
  }

  return context;
}
