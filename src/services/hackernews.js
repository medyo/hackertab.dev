import cachedRequest from './cachedRequest';


const getTopStories = async () => {
    const ttl = 3600*100
    const url = `https://api.hackertab.dev/data/hackernews.json`
    const data = await cachedRequest(url, ttl)
    return data
}

export default {
    getTopStories: getTopStories,
}
