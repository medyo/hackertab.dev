import cachedRequest from './cachedRequest';


const getTrending = async (language, since) => {
    const responseId = `github-${language}-${since}`
    const ttl = 3600*100
    const url = `https://api.hackertab.dev/data/github/${language}/${since}.json`
    const data = await cachedRequest(url, ttl)
    return data
    
}



export default {
    getTrending: getTrending,
}
