import {AxiosError, AxiosResponse} from 'axios';
import Request from './request';

const unauthorizedRequest = new Request();

unauthorizedRequest.api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    throw error;
  },
);

export default unauthorizedRequest;
