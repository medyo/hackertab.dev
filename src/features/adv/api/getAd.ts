import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Ad } from '../types'

const getAd = async (keywords: string[], feed: boolean = false): Promise<Ad | null> => {
  let params = { keywords: keywords.join(','), feed: feed ? 'true' : 'false' }
  return axios.get('/engine/ads/', { params })
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
    queryKey: ['ad', keywords.join(',')],
    queryFn: () => getAd(keywords, feed),
  })
}
