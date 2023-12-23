import {AppRootParams} from 'models/routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParams {}
  }
}
