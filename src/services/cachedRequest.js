import axios from 'axios';
import LocalStore from '../utils/LocalStore'


const isEmptyData = (data) => {
    if (Array.isArray(data) && data.length > 0 || data) { return false }
    return true
}


const cachedRequest = async (url, ttl) => {
    const cachedData = await LocalStore.get(url)
    if (cachedData) {
        return cachedData
    }
    let response = await axios.get(url)
    if (response.status == 200 && !isEmptyData(response.data)) {
        LocalStore.set(url, response.data, ttl)
    }
    
    return response.data
}


export default cachedRequest