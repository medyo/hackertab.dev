import cachedRequest from './cachedRequest';


const getTagConfs = async (tag) => {
    const currentYear = new Date().getFullYear();
    const url = `https://raw.githubusercontent.com/tech-conferences/conference-data/main/conferences/${currentYear}/${tag}.json`
    const data = await cachedRequest(url);
    return data
}

export default {
    getTagConfs: getTagConfs,
}
