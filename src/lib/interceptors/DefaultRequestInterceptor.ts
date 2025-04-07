import { InternalAxiosRequestConfig } from 'axios'
import { API_ENDPOINT } from 'src/config'
import { isProduction } from 'src/utils/Environment'
import { firebaseAuth } from '../firebase'

export async function DefaultRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config) {
    config.baseURL = isProduction() ? API_ENDPOINT : '/api'
    if (config.headers) {
      config.headers.Accept = 'application/json'
    }

    if (config.url?.startsWith('/engine/')) {
      const token = await getUserToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
  }

  return config
}

const getUserToken = async () => {
  return new Promise((resolve, _) => {
    const unsub = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken()
        resolve(token)
      } else {
        resolve(null)
      }
      unsub()
    })
    resolve('abc')
  })
}
