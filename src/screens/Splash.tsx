import React from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
// import {useTranslation} from 'react-i18next';

import {Colors} from 'themes/colors';
// import {View} from 'components/ui';
// import {H1} from 'components/ui/text/Typography';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: 'row',
    padding: 6,
  },
  title: {
    flex: 1,
    color: Colors.primary,
    paddingLeft: 16,
  },
});

const Splash = () => {
  // const {t} = useTranslation('common');
  const t = (m: string) => m;

  return (
    <View style={styles.container}>
      {/* <View style={styles.container} flex={1} flexRow center px={6}> */}
      <Image source={require('../assets/images/common/img_btp.png')} />
      <Text style={styles.title}>{t('appName')}</Text>
      {/* <H1 style={styles.title}>{t('appName')}</H1> */}
    </View>
  );
};

export default Splash;
