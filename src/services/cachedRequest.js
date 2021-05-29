import axios from 'axios';
import AppStorage from './localStorage';


const cachedRequest = async (url) => {
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
}


export default cachedRequest