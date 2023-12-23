import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'

const getAIArticles = async (userTopics: string[]): Promise<Article[]> => {
  return axios.get('/engine/feed/get', {
    params: {
      tags: userTopics.join(','),
      limit: 10,
    },
  })
}

type QueryFnType = typeof getAIArticles

type UseGetArticlesOptions = {
  userTopics: string[]
  config?: QueryConfig<QueryFnType>
}

export const useGetAIArticles = ({ userTopics, config }: UseGetArticlesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ai', userTopics.join(',')],
    queryFn: () => getAIArticles(userTopics),
  })
}
