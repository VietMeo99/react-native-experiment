// export const Colors = {
//   primary: '#3888FE',
//   primaryLighter: '#88B7FF',
//   secondary: '#FBD166',
//   secondary2: '#FBD166',
//   background: '#ffffff',
//   surfaceDark: '#252525',
//   surface: '#F5F5FA',
//   surfaceVariant: '#343434',
//   text: '#353945',
//   textSurface: '#FCFCFD',
//   additionalOrange: '#B98C33',
//   additionalBlue: '#33B1B9',
//   additionalGray: '#A08C8C',
//   error: '#FA4F64',
//   transparent: 'transparent',
//   black: '#000000',
// };

export const Colors = {
  primary: '#3888FE',
  primaryLighter: '#88B7FF',
  primaryLighten: '#DBEAFE',
  primaryLight: '#EBF3FF',
  secondary1: '#FA4F64',
  secondaryLight1: '#FEE2E2',
  secondaryDark1: '#835F63',
  secondary2: '#FBD166',
  secondaryDark2: '#A89972',
  secondary3: '#21A516',
  secondaryLighter3: '#30B38C',
  secondaryDark3: '#D2FFE1',
  neutral1: '#FCFCFD',
  neutral2: '#F4F5F6',
  neutral3: '#E6E8EC',
  neutral4: '#B1B5C3',
  neutral5: '#777E90',
  neutral6: '#353945',
  neutral7: '#23262F',
  neutral8: '#141416',
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  border: '#d8d8d8',
};

export function withOpacity(color: string, opacity: number): string {
  if ((__DEV__ && color.length !== 7) || opacity < 0 || opacity > 1) {
    return color;
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
