import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Version } from '../types'

const getAd = async (): Promise<Version[]> => {
  return axios
    .get<Version[]>('https://api.github.com/repos/medyo/hackertab.dev/releases')
    .then((response) => {
      const versions = response as unknown as Version[]
      return versions
    })
}

type QueryFnType = typeof getAd

type UseGetAdOptions = {
  config?: QueryConfig<QueryFnType>
}
export const useGetVersions = ({ config }: UseGetAdOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['versions'],
    queryFn: () => getAd(),
  })
}
