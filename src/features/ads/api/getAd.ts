import { useQuery } from '@tanstack/react-query'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Ad } from '../types'
import { axios } from 'src/lib/axios'

const getAd = async (): Promise<Ad | null> => {

  return axios.get<Ad | null>('/engine/ads/').then((response) => {
    const data = response as unknown as Ad
    return data
  })
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  config?: QueryConfig<QueryFnType>
}
export const useGetAd = ({ config }: UseGetAdOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['ad'],
    queryFn: () => getAd(),
  })
}