import Axios from 'axios';
import { ResponseInterceptor } from "./interceptors/ResponseInterceptor";
const packageFile = require('../../package.json')

const getBaseApi = (fallback: string | null = null) => {
  return process.env.NODE_ENV === 'production' ? packageFile.proxy : fallback
}


export const axios = Axios.create({
  baseURL: getBaseApi()
});
axios.interceptors.response.use(ResponseInterceptor);