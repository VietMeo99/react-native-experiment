import React from 'react';
import {useTranslation} from 'react-i18next';

import {View} from 'components/ui';
import {Body1} from 'components/ui/text/Typography';
import IconMagnifyingGlassCircleLarge from 'assets/images/search/ic_magnifying_glass_circle_large.svg';

const Empty = () => {
  const {t} = useTranslation('common');

  return (
    <View flex={1} px={6} py={12} alignCenter>
      <IconMagnifyingGlassCircleLarge />
      <Body1 style={{width: 200}} center>
        {t('letSearchByFilterToShowData')}
      </Body1>
    </View>
  );
};

export default Empty;
