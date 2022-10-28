import Axios from 'axios';
import { getBaseApi } from 'src/utils/DataUtils'
import { ResponseInterceptor } from "./interceptors/ResponseInterceptor";

export const axios = Axios.create({
  baseURL: getBaseApi(null)
});
axios.interceptors.response.use(ResponseInterceptor);