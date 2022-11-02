import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { QueryConfig } from 'src/lib/react-query'
import { ArticleType } from 'src/types'
import { axios } from 'src/lib/axios'

const getArticles = async (tag: string): Promise<ArticleType[]> => {
  return axios.get(`/data/v2/devto/${tag}.json`)
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
}

export const useGetArticles = ({ config, tags }: UseGetArticlesOptions) => {
  return useQueries({
    queries: tags.map<UseQueryOptions<ArticleType[]>>((tag) => {
      return {
        ...config,
        queryKey: ['devtoArticles', tag],
        queryFn: () => getArticles(tag),
      }
    })
  })
}
