import cachedRequest from './cachedRequest';


const getTopPostsBySubReddit = async (subReddit) => {
    const url = `/reddit/${subReddit}/top/.json?t=day`;
    const { data : { children } } = await cachedRequest(url)
    return children
}


export default {
    getTopPostsBySubReddit: getTopPostsBySubReddit,
}