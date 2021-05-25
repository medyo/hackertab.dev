import cachedRequest from './cachedRequest';


const getRemoteConfiguration = async () => {
    const ttl = 3600*100
    const url = `https://api.hackertab.dev/data/remoteConfiguration.json`
    const data = await cachedRequest(url, ttl)
    return data
}

export default {
    getRemoteConfiguration: getRemoteConfiguration,
}
