import cachedRequest from './cachedRequest';


const getArticlesByCount = async (tag, perPage) => {
  let url = `/devto/articles?state=rising&per_page=${perPage}`
  if (tag) {
    url += `&tag=${tag}`
  }
  const data = await cachedRequest(url)
  return data
}

const getArticles = async (tag) => {
  let url = `/devto/articles?state=rising&per_page=30`
  if (tag) {
    url += `&tag=${tag}`
  }
  const data = await cachedRequest(url)
  return data
}

export default {
  getArticles: getArticles,
  getArticlesByCount: getArticlesByCount,
}
