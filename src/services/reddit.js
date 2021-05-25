import cachedRequest from './cachedRequest';


const getTopPostsBySubReddit = async (subReddit) => {
    const ttl = 3600*100
    const url = `https://www.reddit.com/r/${subReddit}/top/.json?t=day`
    const { data : { children } } = await cachedRequest(url, ttl)
    return children
}


export default {
    getTopPostsBySubReddit: getTopPostsBySubReddit,
}