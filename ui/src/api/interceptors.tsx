import { AxiosError, AxiosResponse } from 'axios';
import { api } from './index';

api.interceptors.response.use(
  function (response: AxiosResponse): AxiosResponse {
  return response;
}, function (error: AxiosError): Promise<AxiosError> {
  if(error.response?.data?.message) {
    alert(`Interceptor error: ${error.response.data.message}`);
  }
  return Promise.reject(error);
});
