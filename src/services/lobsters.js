import cachedRequest from './cachedRequest'

const getTopStories = async () => {
  const url = `/lobsters/hottest.json`
  const data = await cachedRequest(url)
  return data
}

export default {
  getTopStories: getTopStories,
}
