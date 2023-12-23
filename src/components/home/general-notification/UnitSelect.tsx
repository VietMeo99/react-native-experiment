import React, {FC, useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';

import {View, TouchableOpacity} from 'components/ui';
import {Caption1, Title2} from 'components/ui/text/Typography';
import {Colors} from 'themes/colors';
import IconRadio from 'assets/images/common/ic_radio.svg';
import IconRadioChecked from 'assets/images/common/ic_radio_checked.svg';
import {getProfileApi} from 'apis/account.api';
import {getChildrenUnitsApi} from 'apis/common.api';

const styles = StyleSheet.create({
  buttonGroup: {
    paddingHorizontal: 24,
  },
  buttonText: {
    color: Colors.primary,
    textTransform: 'uppercase',
  },
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
  firstField: {borderTopWidth: 1},
});

interface Props {
  value: {value: string; label: string};
  handleSelect: (payload: {value: string; label: string}) => void;
  handleClose: () => void;
}

const UnitSelect: FC<Props> = ({value, handleClose, handleSelect}) => {
  const {t} = useTranslation('home');
  const [unit, setUnit] = useState<{value: string; label: string}>(value);
  const [unitOptions, setUnitOptions] = useState<
    Array<{value: string; label: string}>
  >([{value: '', label: t('all')}]);

  const getUnits = useCallback(async () => {
    try {
      const profileResponse = await getProfileApi();
      if (profileResponse?.unit?.id) {
        const unitResponse = await getChildrenUnitsApi(profileResponse.unit.id);
        setUnitOptions(
          [{value: '', label: t('all')}].concat(
            unitResponse?.map(item => ({
              value: String(item.id),
              label: item.unitName || '',
            })) || [],
          ),
        );
      }
    } catch (e) {
      // TODO: Show Error
    }
  }, [t]);

  useEffect(() => {
    getUnits();
  }, [getUnits]);

  useEffect(() => {
    setUnit(value);
  }, [value]);

  const renderItem = useCallback(
    ({item, index}) => (
      <TouchableOpacity
        style={[styles.field, index === 0 ? styles.firstField : undefined]}
        onPress={() => setUnit(item)}>
        <Caption1 style={{flex: 1}}>{item.label}</Caption1>
        {unit.value === item.value ? <IconRadioChecked /> : <IconRadio />}
      </TouchableOpacity>
    ),
    [unit.value],
  );

  return (
    <View flex={1} pt={2.5} pb={8}>
      <View style={styles.buttonGroup} flexRow alignCenter justifyEnd mb={2}>
        <TouchableOpacity style={{marginRight: 24}} onPress={handleClose}>
          <Title2 style={styles.buttonText}>{t('cancel')}</Title2>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelect(unit)}>
          <Title2 style={styles.buttonText}>{t('choose')}</Title2>
        </TouchableOpacity>
      </View>
      <FlatList
        data={unitOptions}
        renderItem={renderItem}
        keyExtractor={item => item.value}
      />
    </View>
  );
};

export default UnitSelect;
