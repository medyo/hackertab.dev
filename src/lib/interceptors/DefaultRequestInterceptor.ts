import { InternalAxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from 'src/config'
import { getUserToken } from 'src/features/auth'
import { isProduction } from 'src/utils/Environment'

export async function DefaultRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config) {
    config.baseURL = isProduction() ? API_ENDPOINT : '/api'
    if (config.headers) {
      config.headers.Accept = 'application/json'
    }

    const token = await getUserToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
}
