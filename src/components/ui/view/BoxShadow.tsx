import {StyleSheet} from 'react-native';
import styled, {NativeTarget} from 'styled-components/native';
import {Colors} from 'themes/colors';
import View from './View';

const BoxShadow = styled<NativeTarget & {shadowType?: 'all' | 'bottom'}>(View)`
  background-color: ${Colors.white};
  shadow-color: ${Colors.black};
  shadow-offset: {width: 0, height: ${({shadowType}) =>
    shadowType === 'bottom' ? StyleSheet.hairlineWidth : 3}};
  shadow-opacity: ${({shadowType}) =>
    shadowType === 'bottom' ? '0.85' : '0.05'};
  shadow-radius: ${({shadowType}) => (shadowType === 'bottom' ? '0' : '4')}px;
  elevation: 4; 
`;

export const boxShadowStyles = StyleSheet.create({
  all: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  bottom: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: StyleSheet.hairlineWidth},
    shadowOpacity: 0.85,
    shadowRadius: 0,
    elevation: 4,
  },
});

export default BoxShadow;
