import React, {useCallback} from 'react';
import {useField, useFormikContext} from 'formik';
import {Body1} from '../text/Typography';
import {Colors} from 'themes/colors';
import Select, {Props as SelectProps} from './Select';

interface Props
  extends Omit<
    SelectProps<{label: string; value: string}>,
    'value' | 'onChange'
  > {
  name: string;
}

const FormikSelect = ({name, options, ...other}: Props) => {
  const [{value}, {error, touched}] = useField(name);
  const {setFieldTouched, setFieldValue} = useFormikContext();

  const onBlur = useCallback(() => {
    other.onBlur?.();
    setFieldTouched(name);
  }, [setFieldTouched, name, other]);

  const onChange = useCallback(
    (v: {label: string; value: string}) => {
      setFieldValue(name, v.value);
    },
    [setFieldValue, name],
  );

  return (
    <>
      <Select
        {...other}
        value={value}
        options={options}
        getLabel={v => options.find(i => i.value === v)?.label || ''}
        getValue={v => v as string}
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

export default React.memo(FormikSelect);
