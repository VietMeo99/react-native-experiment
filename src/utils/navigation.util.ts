import {NavigationState} from '@react-navigation/native';
import {NavigationContainerRef} from '@react-navigation/core/lib/typescript/src/types';

export const getActiveRouteName = (state: NavigationState): any => {
  const nextRoute = state.routes;
  if (nextRoute && nextRoute[state.index]?.state) {
    return getActiveRouteName(nextRoute[state.index].state as NavigationState);
  }
  return state.routes[state.index].name;
};

export const getActiveRoutes = (state: NavigationState): any => {
  const nextRoute = state.routes;
  if (nextRoute && nextRoute[state.index]?.state) {
    return getActiveRoutes(nextRoute[state.index].state as NavigationState);
  }
  return state.routes;
};

export const navigationService: {
  navigator?: NavigationContainerRef<any> | null;
} = {
  navigator: undefined,
};

export const replaceAndResetRoutes = (name: string, params?: any) => {
  (navigationService.navigator as NavigationContainerRef<any>)?.reset({
    index: 0,
    routes: [{name, params}],
  });
};
