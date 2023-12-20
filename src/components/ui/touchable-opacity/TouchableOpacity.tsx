import {ComponentType} from 'react';
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Spacing} from '../../common/Spacing';
import {Flex, Position} from '../../common/Position';
import {withAllStyleUtils} from 'hoc/withStyle';

const TouchableOpacity: ComponentType<
  TouchableOpacityProps & Spacing & Flex & Position
> = withAllStyleUtils(RNTouchableOpacity);
export default TouchableOpacity;
