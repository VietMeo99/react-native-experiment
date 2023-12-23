import React, {
  FC,
  PropsWithChildren,
  createContext,
  useState,
  useCallback,
} from 'react';

interface FormContextValues {
  submitting: boolean;
  setSubmitting: (value: boolean) => void;
}

export const FormContext = createContext<undefined | FormContextValues>(
  undefined,
);

const FormProvider: FC<PropsWithChildren<object>> = ({children}) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = useCallback(value => {
    setSubmitting(!!value);
  }, []);

  return (
    <FormContext.Provider
      value={{
        submitting,
        setSubmitting: handleSubmit,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
