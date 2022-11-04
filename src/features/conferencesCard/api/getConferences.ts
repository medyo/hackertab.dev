import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { QueryConfig } from 'src/lib/react-query'
import { ConferenceType } from 'src/types'
import { axios } from 'src/lib/axios'

const getConferences = async (tag: string): Promise<ConferenceType[]> => {
  return axios.get(`/data/v2/conferences/${tag}.json`)
}

type QueryFnType = typeof getConferences

type UseGetConferencesOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
}

export const useGetConferences = ({ config, tags }: UseGetConferencesOptions) => {
  return useQueries({
    queries: tags.map<UseQueryOptions<ConferenceType[]>>((tag) => {
      return {
        ...config,
        queryKey: ['conferences', tag],
        queryFn: () => getConferences(tag),
      }
    })
  })
}
