import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Ad } from '../types'




const getAd = async (
  keywords: string[],
  aditionalAdQueries: { [key: string]: string } | undefined
): Promise<Ad | null> => {
  let params = { keywords: keywords.join(',') }
  if (aditionalAdQueries) {
    params = { ...params, ...aditionalAdQueries }
  }
  return axios.get('/engine/ads/', { params })
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  keywords: string[]
  config?: QueryConfig<QueryFnType>
  aditionalAdQueries: { [key: string]: string } | undefined
}
export const useGetAd = ({ keywords, config, aditionalAdQueries }: UseGetAdOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad'],
    queryFn: () => getAd(keywords, aditionalAdQueries),
  })
}
