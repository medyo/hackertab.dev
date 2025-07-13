import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Ad } from '../types'

const getAd = async (
  keywords: string[],
  feed: boolean = false,
  aditionalAdQueries: { [key: string]: string } | undefined
): Promise<Ad | null> => {
  let params = { keywords: keywords.join(','), feed: feed ? 'true' : 'false' }
  if (aditionalAdQueries) {
    params = { ...params, ...aditionalAdQueries }
  }
  return axios.get('/engine/ads/', { params })
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  keywords: string[]
  feed?: boolean
  config?: QueryConfig<QueryFnType>
  aditionalAdQueries: { [key: string]: string } | undefined
}
export const useGetAd = ({ keywords, feed, config, aditionalAdQueries }: UseGetAdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad', keywords.join(',')],
    queryFn: () => getAd(keywords, feed, aditionalAdQueries),
  })
}
