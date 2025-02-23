import { AxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from 'src/config'
import { getUserToken } from 'src/features/auth'
import { isProduction } from 'src/utils/Environment'

export async function DefaultRequestInterceptor(config: AxiosRequestConfig) {
  if (config) {
    config.baseURL = isProduction() ? API_ENDPOINT : '/api'
    if (config.headers) {
      config.headers.Accept = 'application/json'
    }

    const token = await getUserToken()
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
  }

  return config
}
