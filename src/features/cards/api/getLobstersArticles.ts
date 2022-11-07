import { useQuery } from '@tanstack/react-query'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'
import { axios } from 'src/lib/axios'

const getArticles = async (): Promise<Article[]> => {
  return axios.get('/data/v2/lobsters.json')
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useGetLobstersArticles = ({ config }: UseGetArticlesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['lobsters'],
    queryFn: () => getArticles(),
  })
}
