import cachedRequest from './cachedRequest';

const getJobs = async (tag) => {
    const url = `/data/stackoverflow/${tag}.json`;
    const data = await cachedRequest(url);
    return data
}

export default {
    getJobs: getJobs,
}
