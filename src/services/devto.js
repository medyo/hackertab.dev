import cachedRequest from './cachedRequest';


const getArticles = async (tag) => {
    const ttl = 3600*100
    const url = `https://dev.to/api/articles?state=rising&per_page=30&tag=${tag}`
    const data = await cachedRequest(url, ttl)
    return data
}


export default {
    getArticles: getArticles,
}