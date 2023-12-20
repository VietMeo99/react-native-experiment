import 'react-i18next';

import common from 'translations/vi/namespaces/common.json';
import auth from 'translations/vi/namespaces/auth.json';
import home from 'translations/vi/namespaces/home.json';
import account from 'translations/vi/namespaces/account.json';
import notification from 'translations/vi/namespaces/notification.json';
import password from 'translations/vi/namespaces/password.json';
import search from 'translations/vi/namespaces/search.json';
import penalize from 'translations/vi/namespaces/penalize.json';
import handle from 'translations/vi/namespaces/handle.json';

declare module 'react-i18next' {
  interface Resources {
    common: typeof common;
    auth: typeof auth;
    home: typeof home;
    account: typeof account;
    notification: typeof notification;
    password: typeof password;
    search: typeof search;
    penalize: typeof penalize;
    handle: typeof handle;
  }
}
