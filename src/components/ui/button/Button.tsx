import React, {FC, ReactNode} from 'react';
import {
  ActivityIndicator,
  PixelRatio,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import styled, {css} from 'styled-components/native';
import View, {EnhancedViewProps} from '../view/View';
import {Colors} from 'themes/colors';
import TouchableOpacity from '../touchable-opacity/TouchableOpacity';
import {NotoSans} from 'themes/fonts';

export type ButtonType = 'primary' | 'secondary' | 'transparent';

const PrimaryButtonText = css`
  color: ${Colors.neutral1};
`;
const SecondaryButtonText = css`
  color: ${Colors.neutral5};
`;
const TransparentButtonText = css`
  color: ${Colors.primary};
`;

const ButtonText = styled.Text<{variant: ButtonType; disabled?: boolean}>`
  color: ${Colors.neutral1};
  font-family: ${NotoSans.Medium};
  font-size: 14px;
  line-height: 20px;
  ${({variant}) => {
    switch (variant) {
      case 'primary': {
        return PrimaryButtonText;
      }

      case 'secondary': {
        return SecondaryButtonText;
      }

      case 'transparent': {
        return TransparentButtonText;
      }

      default: {
        return PrimaryButtonText;
      }
    }
  }}
`;
const ButtonContainer = styled(TouchableOpacity)<{
  variant?: ButtonType;
  full?: boolean;
  borderNone?: boolean;
  disabled?: boolean;
  rounded?: boolean;
}>`
  flex-shrink: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${props =>
    props.rounded ? '99px' : props.borderNone ? '0px' : '8px'};
  padding-horizontal: 10px;
  ${props =>
    props.full
      ? css`
          width: 100%;
          justify-content: center;
        `
      : css`
          width: auto;
        `};
  border: ${({variant}) => {
    switch (variant) {
      case 'secondary': {
        return `${PixelRatio.roundToNearestPixel(1)}px solid ${
          Colors.neutral5
        }`;
      }
      default: {
        return 'none';
      }
    }
  }};
  background-color: ${({variant, disabled}) => {
    if (disabled) {
      return Colors.primaryLighter;
    }
    switch (variant) {
      case 'primary': {
        return Colors.primary;
      }
      case 'secondary': {
        return Colors.transparent;
      }

      case 'transparent': {
        return Colors.transparent;
      }

      default: {
        return Colors.primary;
      }
    }
  }};
`;

interface Props {
  textStyle?: TextStyle;
  loading?: boolean;
  variant?: ButtonType;
  full?: boolean;
  borderNone?: boolean;
  height?: number;
  rounded?: boolean;
}

const Button: FC<Props & TouchableOpacityProps & EnhancedViewProps> = ({
  children,
  textStyle,
  loading,
  borderNone = false,
  variant = 'primary',
  height = 40,
  style,
  rounded = false,
  ...other
}) => {
  const renderChild = (child: ReactNode, key?: number) =>
    typeof child === 'string' ? (
      <ButtonText
        disabled={other.disabled}
        style={textStyle}
        key={String(key)}
        variant={variant}>
        {child}
      </ButtonText>
    ) : (
      child
    );

  return (
    <ButtonContainer
      style={[style, {height}]}
      disabled={other.disabled || loading}
      variant={variant}
      borderNone={borderNone}
      rounded={rounded}
      {...other}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.neutral1 : Colors.neutral5}
          size={'small'}
        />
      ) : (
        <View flexRow alignCenter justifyCenter>
          {Array.isArray(children)
            ? children.map(renderChild)
            : renderChild(children)}
        </View>
      )}
    </ButtonContainer>
  );
};

export default Button;
