import axios from 'axios'


const getTrending = async (language, since) => {
    const url = `https://api.hackertab.dev/data/github/${language}/${since}.json`
    let { data } =  await axios.get(url)
    return data
}



export default {
    getTrending: getTrending,
}
