import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  UIManager,
} from 'react-native';
import * as Platform from 'utils/platform.util';
import {enableScreens} from 'react-native-screens';

import * as Sentry from '@sentry/react-native';

const DSN =
  'https://f8e01016c6ced230ef1b435c8ec04c1a@o4506389148794880.ingest.sentry.io/4506389152858112';

// run this before any screen render(usually in App.js)
function bootstrapApp() {
  Sentry.init({
    dsn: DSN,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
  });
  if (Platform.AndroidOS && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  (ScrollView as any).defaultProps = {
    keyboardShouldPersistTaps: 'handled',
  };
  (KeyboardAvoidingView as any).defaultProps = {
    behavior: Platform.AndroidOS ? 'none' : 'padding',
  };
  (Text as any).defaultProps = {
    minimumFontScale: 1,
    maxFontSizeMultiplier: 1,
    underlineColorAndroid: 'transparent',
  };
  (TouchableOpacity as any).defaultProps = {
    activeOpacity: 0.5,
  };
  enableScreens();
}

export {bootstrapApp};
