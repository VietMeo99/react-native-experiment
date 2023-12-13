import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationService} from 'utils/navigation.util';
import AppRoutes from 'routes/App.routes';

const RootRoutes = () => {
  return (
    <NavigationContainer
      ref={nav => {
        navigationService.navigator = nav;
      }}>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default RootRoutes;
