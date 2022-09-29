import cachedRequest from './cachedRequest'

const getTopStories = async () => {
  const url = `/data/indiehackers.json`
  const data = await cachedRequest(url)
  return data
}

export default {
  getTopStories: getTopStories,
}
