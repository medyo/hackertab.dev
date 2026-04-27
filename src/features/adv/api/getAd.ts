import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Ad } from '../types'

const getAd = async (keywords: string[]): Promise<Ad[]> => {
  let params = { keywords: keywords.join(',') }
  return axios.get('/engine/ads/adaptive_v2', { params })
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  keywords: string[]
  config?: QueryConfig<QueryFnType>
}
export const useGetAd = ({ keywords, config }: UseGetAdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad', 'v3', keywords.join(',')],
    queryFn: () => getAd(keywords),
  })
}
