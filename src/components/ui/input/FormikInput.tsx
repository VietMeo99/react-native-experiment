import React, {forwardRef, useCallback} from 'react';
import {useField, useFormikContext} from 'formik';
import Input, {InputProps} from 'components/ui/input/Input';
import {Body1} from '../text/Typography';
import {Colors} from 'themes/colors';

interface Props extends InputProps {
  name: string;
}

const FormikInput = forwardRef<any, Props>(({name, ...other}, ref) => {
  const [{value}, {error, touched}] = useField(name);
  const {setFieldTouched, setFieldValue} = useFormikContext();

  const onBlur = useCallback(
    e => {
      other.onBlur?.(e);
      setFieldTouched(name);
    },
    [setFieldTouched, name, other],
  );

  const onChangeText = useCallback(
    (v: string) => {
      setFieldValue(name, v);
    },
    [setFieldValue, name],
  );

  return (
    <>
      <Input
        value={value}
        {...other}
        ref={ref}
        onBlur={onBlur}
        onChangeText={onChangeText}
        isError={!!error && !!touched}
      />
      {error && touched ? (
        <Body1 style={{color: Colors.secondary1, marginTop: 8}} left>
          {error}
        </Body1>
      ) : null}
    </>
  );
});

export default React.memo(FormikInput);
