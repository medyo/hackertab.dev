import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'
import { axios } from 'src/lib/axios'

const getArticles = async (tag: string): Promise<Article[]> => {
  return axios.get(`/data/v2/devto/${tag}.json`)
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
}

export const useGetMediumArticles = ({ config, tags }: UseGetArticlesOptions) => {
  return useQueries({
    queries: tags.map<UseQueryOptions<Article[]>>((tag) => {
      return {
        ...config,
        queryKey: ['medium', tag],
        queryFn: () => getArticles(tag),
      }
    })
  })
}
