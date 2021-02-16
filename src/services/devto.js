import axios from 'axios'



const getArticles = async (tag) => {
    const url = `https://dev.to/api/articles?state=rising&per_page=30&tag=${tag}`
    let { data } =  await axios.get(url)
    return data
}


export default {
    getArticles: getArticles,
}