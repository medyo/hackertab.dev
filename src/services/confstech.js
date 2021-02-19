import axios from 'axios'

const getTagConfs = async (tag) => {
    const currentYear = new Date().getFullYear()
    const url = `https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/${currentYear}/${tag}.json`
    let { data } =  await axios.get(url)
    return data
}

export default {
    getTagConfs: getTagConfs,
}
