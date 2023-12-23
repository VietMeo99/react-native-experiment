import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {I18nextProvider} from 'react-i18next';
import * as Sentry from '@sentry/react-native';
import 'react-native-get-random-values';

import i18n from 'translations/i18n';
import RootRoutes from './routes/Root.routes';
import AuthProvider from 'contexts/AuthContext';
import {bootstrapApp} from 'utils/bootstrapApp.util';
import CachedParamsProvider from 'contexts/CachedParamsContext';
import SearchProvider from 'contexts/SearchContext';
import HeaderProvider from 'contexts/HeaderContext';
import FormProvider from 'contexts/FormContext';

bootstrapApp();

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  // };

  return (
    <>
      {/* <SafeAreaView style={backgroundStyle}> */}
      {/* </SafeAreaView> */}
      <StatusBar
        backgroundColor={'white'}
        translucent={true}
        barStyle={'dark-content'}
      />
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <I18nextProvider i18n={i18n}>
            <CachedParamsProvider>
              <AuthProvider>
                <FormProvider>
                  <SearchProvider>
                    <HeaderProvider>
                      <RootRoutes />
                    </HeaderProvider>
                  </SearchProvider>
                </FormProvider>
              </AuthProvider>
            </CachedParamsProvider>
          </I18nextProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
}

export default Sentry.wrap(App);
