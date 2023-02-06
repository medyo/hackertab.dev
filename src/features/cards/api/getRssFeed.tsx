import { useQuery } from '@tanstack/react-query'
import * as htmlparser2 from 'htmlparser2'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'

const getArticles = async (feedUrl: string): Promise<Article[]> => {
  const res: string = await axios.get(`/remote_feed?feedUrl=${feedUrl}`)
  try {
    const feed = htmlparser2.parseFeed(res)
    return feed?.items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        url: item.link,
        published_at: +(item.pubDate || new Date()),
        source: 'customFeed',
      }
    }) as Article[]
  } catch (err) {
    console.log(666, err)
  }
  return []
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  feedUrl: string
}

export const useRssFeed = ({ feedUrl, config }: UseGetArticlesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['hackernews'],
    queryFn: () => getArticles(feedUrl),
  })
}
