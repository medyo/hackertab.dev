import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Conference } from 'src/types'

const getConferences = async (tags: string[]): Promise<Conference[]> => {
  return axios.get(`/engine/conferences`, {
    params: {
      tags: tags?.join(','),
    },
  })
}

type QueryFnType = typeof getConferences

type UseGetConferencesOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
}

export const useGetConferences = ({ config, tags }: UseGetConferencesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['conferences_v2', ...tags],
    queryFn: () => getConferences(tags),
  })
}
