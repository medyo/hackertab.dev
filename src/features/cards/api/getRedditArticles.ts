import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'
import { axios } from 'src/lib/axios'

const getArticles = async (tag: string): Promise<Article[]> => {
  return axios.get(`/data/v2/reddit/${tag}.json`)
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
}

export const useGetRedditArticles = ({ config, tags }: UseGetArticlesOptions) => {
  return useQueries({
    queries: tags.map<UseQueryOptions<Article[]>>((tag) => {
      return {
        ...config,
        queryKey: ['reddit', tag],
        queryFn: () => getArticles(tag),
      }
    })
  })
}
