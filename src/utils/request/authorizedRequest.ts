import {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

import Alert from 'utils/alertManager';
import Request from './request';
import {t} from 'i18next';
import {tokenManager} from 'utils/tokenManager';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

const authorizedRequest = new Request();

authorizedRequest.api.interceptors.request.use(
  (config: AdaptAxiosRequestConfig) => {
    const newConfig: AdaptAxiosRequestConfig = {...config};
    const {token} = tokenManager;
    newConfig.headers.Authorization = token ? `Bearer ${token}` : '';
    return newConfig;
  },
);

authorizedRequest.api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error && error.response && error.response.status === 401) {
      tokenManager.doLogout();
      Alert.alert(t('common:notification'), t('common:tokenExpired'));
    }
    throw error;
  },
);

export default authorizedRequest;
