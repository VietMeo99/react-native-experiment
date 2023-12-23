import {useContext} from 'react';

import {FormContext} from 'contexts/FormContext';

export default function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('Form context hook is not used correctly');
  }

  return context;
}
