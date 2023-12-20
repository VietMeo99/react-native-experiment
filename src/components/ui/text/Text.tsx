import React, {ComponentType, forwardRef} from 'react';
import {Text as TextRN, TextProps} from 'react-native';
import styled from 'styled-components/native';

import {Spacing} from '@components/common/Spacing';
import {TextAlignment} from '@components/common/Text';
import {withSpacing, withTextAlignment} from 'hoc/withStyle';
import {FontSize, NotoSans} from 'themes/fonts';
import {Colors} from 'themes/colors';

const TextRNStyled = styled(TextRN)`
  font-family: ${NotoSans.Regular};
  color: ${Colors.neutral5};
  font-size: ${FontSize.body1}px;
`;

export interface TextEnhancedProps extends TextProps {
  fontSize?: number;
}

const TextBase = forwardRef<TextRN, TextEnhancedProps>(
  ({children, style, fontSize, ...other}, ref) => {
    return (
      <TextRNStyled
        ref={ref}
        {...other}
        style={[style, !!fontSize && {fontSize: fontSize}]}>
        {children}
      </TextRNStyled>
    );
  },
);

// TextBase.displayName = 'TextBase';

const Text: ComponentType<TextEnhancedProps & Spacing & TextAlignment> =
  withTextAlignment(withSpacing(TextBase));

export default Text;
