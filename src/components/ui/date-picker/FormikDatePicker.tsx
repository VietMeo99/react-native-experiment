import React, {useCallback} from 'react';
import {useField, useFormikContext} from 'formik';
import {Body1} from '../text/Typography';
import {Colors} from 'themes/colors';
import DatePicker, {Props as DatePickerProps} from './DatePicker';

interface Props extends Omit<DatePickerProps, 'value' | 'onChange'> {
  name: string;
}

const FormikDatePicker = ({name, isRange, ...other}: Props) => {
  const [{value}, {error, touched}] = useField(name);
  const {setFieldTouched, setFieldValue} = useFormikContext();

  const onBlur = useCallback(() => {
    other.onBlur?.();
    setFieldTouched(name);
  }, [setFieldTouched, name, other]);

  const onChange = useCallback(
    (v: Date | {start: Date; end: Date}) => {
      setFieldValue(name, v);
    },
    [setFieldValue, name],
  );

  return (
    <>
      <DatePicker
        isRange={isRange}
        value={isRange ? undefined : value}
        range={isRange ? value : undefined}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && touched ? (
        <Body1 style={{color: Colors.secondary1, marginTop: 8}} left>
          {error}
        </Body1>
      ) : null}
    </>
  );
};

export default React.memo(FormikDatePicker);
