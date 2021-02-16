import axios from 'axios'


const getTopStories = async () => {
    const url = `https://api.hackertab.dev/data/hackernews.json`
    let { data } =  await axios.get(url)
    return data
}

export default {
    getTopStories: getTopStories,
}
