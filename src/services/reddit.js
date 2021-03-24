import axios from 'axios'


const getTopPostsBySubReddit = async (subReddit) => {
    const url = `https://www.reddit.com/r/${subReddit}/top/.json?t=day`
    let { data: { data : { children } } } =  await axios.get(url)
    return children
}


export default {
    getTopPostsBySubReddit: getTopPostsBySubReddit,
}