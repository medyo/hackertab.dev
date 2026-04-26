import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'

const getAd = async (keywords: string[], feed: boolean = false): Promise<Ad[]> => {
  let params = { keywords: keywords.join(','), feed: feed ? 'true' : 'false' }
  return axios.get('/engine/ads/adaptive_v2', { params })
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  keywords: string[]
  feed?: boolean
  config?: QueryConfig<QueryFnType>
}
export const useGetAd = ({ keywords, feed, config }: UseGetAdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad', 'v3', keywords.join(',')],
    queryFn: () => getAd(keywords, feed),
  })
}
