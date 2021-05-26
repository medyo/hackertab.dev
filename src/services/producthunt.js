import cachedRequest from './cachedRequest';


const getTodayProducts = async () => {
  const url = `/data/producthunt.json`;
  const data = await cachedRequest(url);
  return data
}

export default {
  getTodayProducts: getTodayProducts,
}
