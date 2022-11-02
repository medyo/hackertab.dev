import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { QueryConfig, ExtractFnReturnType } from 'src/lib/react-query'
import { ArticleType } from 'src/types'
import { axios } from 'src/lib/axios'

const getArticles = async (tag: string, dateRange: string): Promise<ArticleType[]> => {
  return axios.get(`/data/v2/github/${tag}/${dateRange}.json`)
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
  dateRange: "daily" | "monthly" | "weekly"
}

export const useGetArticles = ({ config, tags, dateRange }: UseGetArticlesOptions) => {
  return useQueries({
    queries: tags.map<UseQueryOptions<ArticleType[]>>((tag) => {
      return {
        ...config,
        queryKey: ['githubArticles', tag, dateRange],
        queryFn: () => getArticles(tag, dateRange),
      }
    })
  })
}