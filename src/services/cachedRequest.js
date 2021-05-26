import axios from 'axios';
import LocalStore from '../utils/LocalStore'

const cachedRequest = async (url) => {
    const cachedResponse = await LocalStore.getCachedResponse(url)
    
    let config = {}

    if (cachedResponse) {
        config = {
            headers: {
                "If-None-Match": cachedResponse.etag,
            }
        }
    } 

    let response 
    try {
        response = await axios.get(url, config)
        if (response.headers.etag) {
            await LocalStore.cacheResponse(url, response)
        }

    } catch(error) {
        if (error.response && error.response.status === 304) {
            if (!cachedResponse) {
                throw error
            }

            response = error.response;
            response.status = 200;
            response.data = cachedResponse.data;
        } else {
            throw error
        }
    }
    

    
    return response.data
}


export default cachedRequest