import cachedRequest from './cachedRequest';

const getTrending = async (language, since) => {
    const url = `/data/github/${language}/${since}.json`;
    const data = await cachedRequest(url);
    return data
    
}

export default {
    getTrending: getTrending,
}
