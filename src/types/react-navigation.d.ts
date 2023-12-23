import {AppRootParams, AccountParams} from 'models/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParams, AccountParams {}
  }
}
