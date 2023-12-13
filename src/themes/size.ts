import {Dimensions} from 'react-native';
import {getStatusBar} from 'utils/style.util';

export const StatusBarHeight = getStatusBar();

export const ScreenHeight = Dimensions.get('screen').height;
export const ScreenWidth = Dimensions.get('screen').width;
export const WindowWidth = Dimensions.get('window').width;
