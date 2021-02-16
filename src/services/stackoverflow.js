import axios from 'axios'



const getJobs = async (tag) => {
    const url = `https://api.hackertab.dev/data/stackoverflow/${tag}.json`
    let { data } =  await axios.get(url)
    return data
}


export default {
    getJobs: getJobs,
}
