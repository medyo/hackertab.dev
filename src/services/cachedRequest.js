import axios from 'axios';
import localforage from 'localforage';
import { setup } from 'axios-cache-adapter'

const forageStore = localforage.createInstance({
  driver: [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE
  ],
  name: 'hackertab-cache'
})

const api = setup({
  cache: {
    maxAge: 15 * 60 * 1000,
    store: forageStore
  },
  baseURL: 'https://api.hackertab.dev',
})


const cachedRequest = async (url, maxAge = 15) => {
  let { data } = await api.get(url, {
    cache: {
      maxAge
    }
  })

  return data
}

export default cachedRequest