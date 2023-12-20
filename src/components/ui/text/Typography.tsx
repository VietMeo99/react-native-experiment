import styled, {css} from 'styled-components/native';
import {FontWeight, getFonts, NotoSans} from 'themes/fonts';
import {Colors} from 'themes/colors';
import Text from './Text';
import {ComponentType} from 'react';
import {
  DefaultTheme,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemedStyledProps,
} from 'styled-components';
import {Spacing} from 'components/common/Spacing';
import {TextAlignment} from 'components/common/Text';
import {TextEnhancedProps} from 'components/ui/text/Text';

interface TextStyle {
  fontWeight?: FontWeight;
}

export const defaultText = css`
  color: ${Colors.neutral5};
`;

export const titleText = css`
  color: ${Colors.neutral6};
`;

export const h1 = css<TextStyle>`
  font-size: 24px;
  line-height: 40px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '500', 'normal')};
`;
export const h2 = css<TextStyle>`
  font-size: 20px;
  line-height: 32px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '500', 'normal')};
`;
export const title1 = css<TextStyle>`
  font-size: 16px;
  line-height: 24px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '600', 'normal')};
`;
export const title2 = css<TextStyle>`
  font-size: 16px;
  line-height: 20px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '500', 'normal')};
`;
export const body1 = css<TextStyle>`
  font-size: 14px;
  line-height: 20px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '400', 'normal')};
`;
export const caption1 = css<TextStyle>`
  font-size: 14px;
  line-height: 20px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '500', 'normal')};
`;
export const caption2 = css<TextStyle>`
  font-size: 12px;
  line-height: 20px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '500', 'normal')};
`;
export const smallText = css<TextStyle>`
  font-size: 12px;
  line-height: 20px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '400', 'normal')};
`;
export const overline = css<TextStyle>`
  font-size: 10px;
  line-height: 16px;
  font-family: ${props =>
    getFonts(NotoSans, props.fontWeight ?? '500', 'normal')};
`;

export function withStyle<T>(
  component: ComponentType<T>,
  ...styles:
    | FlattenSimpleInterpolation[]
    | FlattenInterpolation<ThemedStyledProps<TextStyle, DefaultTheme>>
) {
  return styled(component)<TextStyle>`
    ${styles}
  `;
}

export const H1: ComponentType<TextEnhancedProps & Spacing & TextAlignment> =
  withStyle(Text, titleText, h1);
export const H2: ComponentType<TextEnhancedProps & Spacing & TextAlignment> =
  withStyle(Text, titleText, h2);
export const Title1: ComponentType<
  TextEnhancedProps & Spacing & TextAlignment
> = withStyle(Text, titleText, title1);
export const Title2: ComponentType<
  TextEnhancedProps & Spacing & TextAlignment
> = withStyle(Text, titleText, title2);
export const Body1: ComponentType<TextEnhancedProps & Spacing & TextAlignment> =
  withStyle(Text, defaultText, body1);
export const Caption1: ComponentType<
  TextEnhancedProps & Spacing & TextAlignment
> = withStyle(Text, defaultText, caption1);
export const Caption2: ComponentType<
  TextEnhancedProps & Spacing & TextAlignment
> = withStyle(Text, defaultText, caption2);
export const SmallText: ComponentType<
  TextEnhancedProps & Spacing & TextAlignment
> = withStyle(Text, defaultText, smallText);
export const Overline: ComponentType<
  TextEnhancedProps & Spacing & TextAlignment
> = withStyle(Text, defaultText, overline);
