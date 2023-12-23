import React from 'react';
import {StyleSheet} from 'react-native';

import {View} from 'components/ui';
import {Colors} from 'themes/colors';
import DecisionPenalize from 'components/penalize/DecisionPenalize';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral1,
    position: 'relative',
  },
});

const Penalize = () => {
  return (
    <View flex={1} pt={4} style={styles.container}>
      <DecisionPenalize />
    </View>
  );
};

export default Penalize;