import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    isDark: boolean;
    colors: {
      rioGrande: string;
      orangePeel: string;
      japaneseLaurel: string;
      red: string;
      alizarinCrimson: string;
      black: string;
      boulder: string;
      nobel: string;
      tundora: string;
      mercury: string;
      white: string;
      white_2: string;
      white_3: string;
      mineShaft: string;
      primary: string;
      doveGray: string;
      whisper: string;
      grey: string;
      silver: string;
      dustyGray: string;
      alto: string;
      background_screen: string;
    };
    sizes: {
      tiny: 11;
      small: 13;
      medium: 17;
      large: 29;
      navigationTitle: 21;
      welcomeFontSize: 42;
    };
    fonts: {
      regular: string;
      bold: string;
      semiBold: string;
      light: string;
      italic: string;
    };
  }
}
