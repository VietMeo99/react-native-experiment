import React, {useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {Colors} from 'themes/colors';
import {View} from 'components/ui';
import ScrollTabs from 'components/ui/tabs/ScrollTabs';
import DecisionPenalize from 'components/penalize/DecisionPenalize';
import DecisionApply from 'components/handle/DecisionApply';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
  },
});

const SearchViolationInfo = () => {
  const {t} = useTranslation('search');
  const {params} = useRoute<any>();
  const [active, setActive] = useState(0);

  const tabs = useMemo(() => {
    return [
      {title: t('penalizeVPHC'), key: 'penalize'},
      {title: t('handleVPHC'), key: 'handling'},
    ];
  }, [t]);

  const activeIndex = useMemo(() => {
    return Number(params?.tab || active);
  }, [active, params]);

  return (
    <View style={styles.container} flex={1} pt={2}>
      <ScrollTabs
        style={{marginHorizontal: 24}}
        tabs={tabs}
        activeIndex={activeIndex}
        onChangeActiveTab={value => {
          setActive(value);
        }}
      />
      {active ? (
        <DecisionApply isSearch={true} />
      ) : (
        <DecisionPenalize isSearch={true} />
      )}
    </View>
  );
};

export default SearchViolationInfo;
