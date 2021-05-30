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

/*const cachedRequest = async (url) => {
    const cachedResponse = await AppStorage.getCachedResponse(url)
    let headers = {}
    let response

    if (cachedResponse) {
        headers = {
            "If-None-Match": cachedResponse.etag,
        }
    }

    
    try {
        response = await axios.get(url, { headers })
        if (response.headers.etag) {
            AppStorage.cacheResponse(url, response)
        }

    } catch (error) {
        if (!error.response || error.response.status !== 304) {
            throw error
        }
        if (!cachedResponse) {
            throw "Network Failed"
        }
        response = error.response;
        response.status = 200;
        response.data = cachedResponse.data;
    }

    return response.data
}*/


export default cachedRequest