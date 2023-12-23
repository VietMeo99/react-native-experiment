import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Picker} from 'react-native-wheel-pick';

import {View, TouchableOpacity} from 'components/ui';
import {Title2} from 'components/ui/text/Typography';
import {Colors} from 'themes/colors';

const monthOptions = Array(12)
  .fill(0)
  .map((i, n) => String(n + 1));

const styles = StyleSheet.create({
  buttonGroup: {
    paddingHorizontal: 24,
  },
  buttonText: {
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  label: {color: Colors.primary},
  picker: {
    width: Platform.select({ios: 150, default: 100}),
    backgroundColor: Colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
});

interface Props {
  value: number;
  handleSelect: (value: number) => void;
  handleClose: () => void;
}

const MonthSelect: FC<Props> = ({value, handleClose, handleSelect}) => {
  const {t} = useTranslation('home');
  const [time, setTime] = useState<number>(value);

  useEffect(() => {
    setTime(value);
  }, [value]);

  return (
    <View flex={1} pt={2.5} pb={8}>
      <View style={styles.buttonGroup} flexRow alignCenter justifyEnd mb={2}>
        <TouchableOpacity style={{marginRight: 24}} onPress={handleClose}>
          <Title2 style={styles.buttonText}>{t('cancel')}</Title2>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelect(time)}>
          <Title2 style={styles.buttonText}>{t('choose')}</Title2>
        </TouchableOpacity>
      </View>
      <View flex={1} center flexRow>
        <Title2 style={styles.label}>{t('month', {month: ''})}</Title2>
        <Picker
          style={styles.picker}
          selectedValue={String(time)}
          pickerData={monthOptions}
          textSize={16}
          selectTextColor={Colors.primary}
          isShowSelectBackground={false}
          onValueChange={v => {
            setTime(Number(v));
          }}
        />
      </View>
    </View>
  );
};

export default MonthSelect;
