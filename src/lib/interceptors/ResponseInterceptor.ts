import { AxiosResponse } from 'axios';

export const ResponseInterceptor = (
  response: AxiosResponse<any>
): AxiosResponse<any> => {
  return response.data;
};