import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {View} from 'components/ui';
import {View, Text} from 'react-native';
import {AppRouter} from 'constants/router';
import {AppRootParams} from 'models/routes';
import React, {FC} from 'react';
import {Colors} from 'themes/colors';
import useAuthContext from 'hooks/useAuth';
import Login from 'screens/auth/Login';
import MainTabs from './Main.routes';

const noop = () => <View />;

const Stack = createNativeStackNavigator<AppRootParams>();

interface Props {
  token?: string;
}
const HomeScreen: FC<Props> = ({token}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: 'black'}}>token: {token}</Text>
      <Text style={{color: 'black'}}>Home Screen</Text>
      <Text style={{color: 'black', backgroundColor: Colors.primary}}>
        Home Screen
      </Text>
      <Text style={{color: 'black'}}>Home Screen</Text>
      <Text style={{color: 'black'}}>Home Screen</Text>
    </View>
  );
};

const AppRoutes = () => {
  const {token} = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName={AppRouter.MAIN}
      screenOptions={{
        // headerShown: false,
        headerShadowVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: Colors.neutral5,
        headerTitleStyle: {fontSize: 14},
        headerTitleAlign: 'center',
      }}>
      {!token ? (
        <>
          <Stack.Screen name={AppRouter.LOGIN} component={Login} />
          {/* <Stack.Screen name={AppRouter.HOME}>
            {props => <HomeScreen {...props} token={token} />}
          </Stack.Screen> */}
          <Stack.Screen name={AppRouter.REGISTER} component={Login} />
        </>
      ) : (
        <>
          <Stack.Screen
            name={AppRouter.MAIN}
            component={MainTabs}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      <Stack.Screen
        name={AppRouter.FORGOT_PASSWORD}
        component={HomeScreen}
        options={{title: 'HOME', headerLeft: noop}}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
