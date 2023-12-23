import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {View, TouchableOpacity} from 'components/ui';
import {Caption1, H2, Title2} from 'components/ui/text/Typography';
import BottomSheet from 'components/ui/bottom-sheet/BottomSheet';
import UnitSelect from './UnitSelect';
import YearSelect from './YearSelect';
import {Colors} from 'themes/colors';

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: Colors.neutral3,
    borderBottomWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

interface Props {
  unit: {value: string; label: string};
  year: number;
  setUnit: (payload: {value: string; label: string}) => void;
  setYear: (payload: number) => void;
}

const FineStatisticFilter: FC<Props> = ({unit, year, setUnit, setYear}) => {
  const {t} = useTranslation('home');

  return (
    <View flex={1} pt={5} pb={8}>
      <H2 center style={{marginBottom: 24}}>
        {t('finesStatisticFilter')}
      </H2>
      <BottomSheet
        renderContent={({onClose}) => (
          <UnitSelect
            value={unit}
            handleClose={onClose}
            handleSelect={value => {
              setUnit(value);
              onClose();
            }}
          />
        )}>
        {({onOpen}) => (
          <TouchableOpacity
            style={[styles.field, {borderTopWidth: 1}]}
            onPress={onOpen}>
            <Title2 mr={2}>{t('unit')}</Title2>
            <Caption1 right style={{flex: 1}}>
              {unit.label}
            </Caption1>
          </TouchableOpacity>
        )}
      </BottomSheet>
      <BottomSheet
        renderContent={({onClose}) => (
          <YearSelect
            value={year}
            handleClose={onClose}
            handleSelect={value => {
              setYear(value);
              onClose();
            }}
          />
        )}>
        {({onOpen}) => (
          <TouchableOpacity style={styles.field} onPress={onOpen}>
            <Title2 mr={2}>{t('year')}</Title2>
            <Caption1 right style={{flex: 1}}>
              {t('yearNumber', {year: year})}
            </Caption1>
          </TouchableOpacity>
        )}
      </BottomSheet>
    </View>
  );
};

export default FineStatisticFilter;
