import cachedRequest from './cachedRequest';



const getJobs = async (tag) => {
    const ttl = 3600*100
    const url = `https://api.hackertab.dev/data/stackoverflow/${tag}.json`
    const data = await cachedRequest(url, ttl)
    return data
}


export default {
    getJobs: getJobs,
}
