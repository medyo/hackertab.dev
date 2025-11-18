import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Product } from 'src/types'

const getArticles = async ({ date }: { date: string }): Promise<Product[]> => {
  return axios.get(`/engine/products`, {
    params: {
      date,
    },
  })
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  date: string
}

export const useGeProductHuntProducts = ({ date, config }: UseGetArticlesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['producthunt', date],
    queryFn: () => getArticles({ date }),
  })
}
