import axios from 'axios'


const getTodayProducts = async () => {
  const url = `https://api.hackertab.dev/data/producthunt.json`
  let { data } = await axios.get(url)
  return data
}

export default {
  getTodayProducts: getTodayProducts,
}
