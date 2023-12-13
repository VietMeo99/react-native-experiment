/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
// cung cấp các phương pháp để quản lý và hiển thị màn hình khởi động (splash screen) trong ứng dụng React Native
// import SplashScreen from 'react-native-splash-screen';
// cung cấp các thành phần và API để xử lý các cử chỉ và sự kiện vuốt, kéo, và chạm trong ứng dụng React Native
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import RootRoutes from 'routes/Root.routes';
import {bootstrapApp} from 'utils/bootstrapApp.util';

bootstrapApp();

function App(): React.JSX.Element {
  useEffect(() => {
    console.log('rnn');
    // SplashScreen.hide();
  }, []);

  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  return (
    <>
      <StatusBar
        backgroundColor={'black'} // Đây là thuộc tính để chỉ định màu nền của StatusBar.
        // Đây là thuộc tính để chỉ định xem StatusBar có đục hay không. Trong trường hợp này, giá trị được đặt là true, cho phép nội dung bên dưới StatusBar hiển thị thông qua StatusBar.
        translucent={true}
        barStyle={'dark-content'}
      />
      <GestureHandlerRootView>
        <RootRoutes />
      </GestureHandlerRootView>
    </>
  );
}

export default App;
