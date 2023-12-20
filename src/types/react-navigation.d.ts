import {AppRootParams} from 'models/route';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParams {}
  }
}
