import cachedRequest from './cachedRequest';


const getArticles = async (tag) => {
  const url = `https://dev.to/api/articles?state=rising&per_page=30&tag=${tag}`;
  const data = await cachedRequest(url);
  return data;
};


export default {
    getArticles: getArticles,
}
