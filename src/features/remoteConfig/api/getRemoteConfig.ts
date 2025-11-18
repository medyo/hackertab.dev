import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { useRemoteConfigStore } from '../stores/remoteConfig'
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
    onSuccess(remoteConfig) {
      useRemoteConfigStore.getState().setRemoteConfig(remoteConfig)
    },
    ...config,
    queryKey: ['remote-config'],
    queryFn: () => getRemoteConfig(),
  })
}
