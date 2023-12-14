import axios, {AxiosInstance, AxiosRequestConfig, Canceler} from 'axios';
import CONFIG from 'config';
// import {t} from 'i18next';
import {stringify} from 'query-string';

const t = (m: string) => m;

export const CANCEL_KEY = 'CANCEL_PROMISE';

const {CancelToken} = axios;

export interface IPromiseWithCancel<R> extends Promise<R> {
  [CANCEL_KEY]?: () => void;
}

interface IOptions {
  rawResponse?: boolean;
}

export default class Request {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: CONFIG.BASE_URL,
      withCredentials: false,
      timeout: 10000,
      timeoutErrorMessage: t('common:somethingWentWrong'),
      headers: {
        'Content-Type': 'application/json',
      },
      paramsSerializer: params => {
        return stringify(params, {arrayFormat: 'comma'});
      },
    });
  }

  setToken(token?: string) {
    this.api.defaults.headers.common = {
      ...this.api.defaults.headers.common,
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  }

  get = <T = any>(
    url: string,
    config: AxiosRequestConfig = {},
    options?: IOptions,
  ) => {
    let cancel: Canceler;

    const newConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...config.params,
      },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    };

    const request: IPromiseWithCancel<T> = this.api
      .get(url, newConfig)
      .then(response => {
        return options?.rawResponse ? response : response.data;
      })
      .catch(error => {
        throw error;
      });

    request[CANCEL_KEY] = () => cancel();

    return request;
  };

  post = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
    options?: IOptions,
  ) => {
    let cancel: Canceler;

    const newConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...config.params,
      },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    };

    const request: IPromiseWithCancel<T> = this.api
      .post(url, body, newConfig)
      .then(response => {
        return options?.rawResponse ? response : response.data;
      })
      .catch(error => {
        throw error;
      });

    request[CANCEL_KEY] = () => cancel();

    return request;
  };

  put = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
    options?: IOptions,
  ) => {
    let cancel: Canceler;

    const newConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...config.params,
      },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    };

    const request: IPromiseWithCancel<T> = this.api
      .put(url, body, newConfig)
      .then(response => {
        return options?.rawResponse ? response : response.data;
      })
      .catch(error => {
        throw error;
      });

    request[CANCEL_KEY] = () => cancel();

    return request;
  };

  patch = <T = any>(
    url: string,
    body?: any,
    config: AxiosRequestConfig = {},
    options?: IOptions,
  ) => {
    let cancel: Canceler;

    const newConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...config.params,
      },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    };

    const request: IPromiseWithCancel<T> = this.api
      .patch(url, body, newConfig)
      .then(response => {
        return options?.rawResponse ? response : response.data;
      })
      .catch(error => {
        throw error;
      });

    request[CANCEL_KEY] = () => cancel();

    return request;
  };

  delete = <T = any>(
    url: string,
    config: AxiosRequestConfig = {},
    options?: IOptions,
  ) => {
    let cancel: Canceler;

    const newConfig: AxiosRequestConfig = {
      ...config,
      params: {
        ...config.params,
      },
      cancelToken: new CancelToken(c => {
        cancel = c;
      }),
    };

    const request: IPromiseWithCancel<T> = this.api
      .delete(url, newConfig)
      .then(response => {
        return options?.rawResponse ? response : response.data;
      })
      .catch(error => {
        throw error;
      });

    request[CANCEL_KEY] = () => cancel();

    return request;
  };
}
