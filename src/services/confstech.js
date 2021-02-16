import axios from 'axios'

const getTagConfs = async (tag) => {
    const url = `https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/2021/${tag}.json`
    let { data } =  await axios.get(url)
    return data
}

export default {
    getTagConfs: getTagConfs,
}
