import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {View} from 'components/ui';
import {View, Text} from 'react-native';
import {AppRouter} from 'constants/router';
import {AppRootParams} from 'models/routes';
import React, {FC, useState} from 'react';
import {Colors} from 'themes/colors';
import useAuthContext from 'hooks/useAuth';

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
      // initialRouteName={AppRouter.MAIN}
      screenOptions={{
        headerShadowVisible: true,
        headerBackTitleVisible: false,
        headerTintColor: Colors.neutral5,
        headerTitleStyle: {fontSize: 14},
        headerTitleAlign: 'center',
        // headerShown: false,
      }}>
      {!token ? (
        <>
          <Stack.Screen
            name={AppRouter.HOME}
            component={() => <HomeScreen token={token} />}
          />
          {/* <Stack.Screen name={AppRouter.ACCOUNT} component={HomeScreen} /> */}
        </>
      ) : (
        <Stack.Screen
          name={AppRouter.HOME}
          component={() => <HomeScreen token={token} />}
        />
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
