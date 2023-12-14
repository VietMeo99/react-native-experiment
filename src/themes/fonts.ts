export const NotoSans = {
  Regular: 'NotoSans-Regular',
  Light: 'NotoSans-Light',
  LightItalic: 'NotoSans-LightItalic',
  Bold: 'NotoSans-Bold',
  Black: 'NotoSans-Black',
  Medium: 'NotoSans-Medium',
  SemiBold: 'NotoSans-SemiBold',
  Thin: 'NotoSans-Thin',
  Ultralight: 'NotoSans-Ultralight',
};

interface Fonts {
  Regular: string;
  Italic: string;
  Light: string;
  LightItalic: string;
  Bold: string;
  BoldItalic: string;
  ExtraBold: string;
  ExtraBoldItalic: string;
  Medium: string;
  MediumItalic: string;
  SemiBoldItalic: string;
  SemiBold: string;
  Thin: string;
  Ultralight: string;
  UltralightItalic: string;
  ThinItalic: string;
}

export type FontWeight =
  | 'normal'
  | 'bold'
  | 'medium'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800';
export type FontStyle = 'normal' | 'italic';

export function getFonts(
  font: Partial<Fonts>,
  fontWeight: FontWeight = '400',
  fontStyle?: FontStyle,
) {
  const sizeToFontText = {
    normal: 'Normal',
    bold: 'Bold',
    medium: 'Medium',
    '100': 'Thin',
    '200': 'Ultralight',
    '300': 'Light',
    '400': 'Regular',
    '500': 'Medium',
    '600': 'SemiBold',
    '700': 'Bold',
    '800': 'ExtraBold',
    '900': 'Black',
  };
  const fontStyleToText = {
    normal: '',
    italic: 'Italic',
  };
  return font[
    (sizeToFontText[fontWeight] || 'Regular') +
      (fontStyleToText[fontStyle] || '')
  ];
}

export const FontSize = {
  h1: 24,
  h2: 20,
  title1: 16,
  title2: 16,
  body1: 14,
  caption1: 14,
  caption2: 12,
  smallText: 12,
  overline: 10,
};
