import { AxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from 'src/config'
import { isProduction } from 'src/utils/Environment'
import { firebaseAuth } from '../firebase'

export async function DefaultRequestInterceptor(config: AxiosRequestConfig) {
  if (config) {
    config.baseURL = isProduction() ? API_ENDPOINT : '/api'
    if (config.headers) {
      config.headers.Accept = 'application/json'
    }

    const user = firebaseAuth.currentUser
    if (user) {
      const token = await user.getIdToken()
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
}
