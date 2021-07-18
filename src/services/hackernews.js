import cachedRequest from './cachedRequest';


const getTopStories = async () => {
    const url = `/data/hackernews.json`;
    const data = await cachedRequest(url);
    return data
}

export default {
    getTopStories: getTopStories,
}
