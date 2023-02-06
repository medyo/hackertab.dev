import { axios } from 'src/lib/axios'

type RssInfoType = {
  title: string
  link: string
}

export const getRssUrlFeed = async (rssUrl: string): Promise<RssInfoType> => {
  return axios.get('/engine/rss_info/', { params: { url: rssUrl } })
}
