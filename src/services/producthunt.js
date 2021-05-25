import cachedRequest from './cachedRequest';


const getTodayProducts = async () => {
  const ttl = 3600*100
  const url = `https://api.hackertab.dev/data/producthunt.json`
  const data = await cachedRequest(url, ttl)
  return data
}

export default {
  getTodayProducts: getTodayProducts,
}
