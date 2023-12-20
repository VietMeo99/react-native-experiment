import {ComponentType} from 'react';
import {View as RNView, ViewProps} from 'react-native';
import {Spacing} from 'components/common/Spacing';
import {Flex, Position} from 'components/common/Position';
import {withAllStyleUtils} from 'hoc/withStyle';

export type EnhancedViewProps = ViewProps & Spacing & Flex & Position;

const View: ComponentType<EnhancedViewProps> = withAllStyleUtils(RNView);

export default View;
