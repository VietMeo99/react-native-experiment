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

const yearOptions = Array(new Date().getFullYear() - 1949)
  .fill(0)
  .map((i, n) => String(n + 1950));

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
  value: {month: number; year: number};
  handleSelect: (value: {month: number; year: number}) => void;
  handleClose: () => void;
}

const TimeSelect: FC<Props> = ({value, handleClose, handleSelect}) => {
  const {t} = useTranslation('home');
  const [time, setTime] = useState<{month: number; year: number}>(value);

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
          selectedValue={String(time.month)}
          pickerData={monthOptions}
          textSize={16}
          selectTextColor={Colors.primary}
          isShowSelectBackground={false}
          onValueChange={v => {
            setTime(p => ({...p, month: Number(v)}));
          }}
        />
        <Title2 style={styles.label}>{t('year', {year: ''})}</Title2>
        <Picker
          style={styles.picker}
          selectedValue={String(time.year)}
          textSize={16}
          selectTextColor={Colors.primary}
          isShowSelectBackground={false}
          pickerData={yearOptions}
          onValueChange={v => {
            setTime(p => ({...p, year: Number(v)}));
          }}
        />
      </View>
    </View>
  );
};

export default TimeSelect;
