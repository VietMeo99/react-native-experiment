import React from 'react';
import {Modal, ActivityIndicator} from 'react-native';

import {Caption1} from './text/Typography';
import View from './view/View';
import {Colors} from 'themes/colors';

interface Props {
  visible: boolean;
  text?: string;
}

const LoadingModal = ({visible, text}: Props) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        flex={1}
        alignCenter
        justifyCenter
        style={{backgroundColor: Colors.neutral2}}>
        <ActivityIndicator color={Colors.neutral5} size={'small'} />
        <Caption1 style={{marginTop: 8}}>{text}</Caption1>
      </View>
    </Modal>
  );
};

export default React.memo(LoadingModal);
