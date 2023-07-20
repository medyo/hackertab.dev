import Axios from 'axios'
import { API_ENDPOINT } from 'src/config'
import { ResponseInterceptor } from './interceptors/ResponseInterceptor'

export const axios = Axios.create({
  baseURL: API_ENDPOINT,
})
axios.interceptors.response.use(ResponseInterceptor)
