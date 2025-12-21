import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { RemoteConfig } from '../types'

const getRemoteConfig = async (): Promise<RemoteConfig> => {
  return axios.get('/data/config.json')
}

type QueryFnType = typeof getRemoteConfig

type UseGetRemoteConfigOptions = {
  config?: QueryConfig<QueryFnType>
}
export const useGetRemoteConfig = ({ config }: UseGetRemoteConfigOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['remote-config', 'v2'],
    queryFn: () => getRemoteConfig(),
  })
}
