import Axios from 'axios'
import { DefaultRequestInterceptor } from './interceptors/DefaultRequestInterceptor'
import { ResponseInterceptor } from './interceptors/ResponseInterceptor'

export const axios = Axios.create()
axios.interceptors.request.use(DefaultRequestInterceptor)
axios.interceptors.response.use(ResponseInterceptor)
