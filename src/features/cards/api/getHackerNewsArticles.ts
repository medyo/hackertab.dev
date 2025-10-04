import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'

const getArticles = async (): Promise<Article[]> => {
  return axios.get(`https://api-dev.hackertab.dev/engine/card?source=hackernews`, {})
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useGetHackertNewsArticles = ({ config }: UseGetArticlesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['hackernews'],
    queryFn: () => getArticles(),
  })
}
