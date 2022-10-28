import { useQuery } from '@tanstack/react-query'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { ArticleType } from '../../card/types'
import { axios } from 'src/lib/axios'

const getArticles = async (): Promise<ArticleType[]> => {
  return axios.get('/data/v2/hackernews.json')
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
}

export const useGetArticles = ({ config }: UseGetArticlesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['hackernewsArticles'],
    queryFn: () => getArticles(),
  })
}
