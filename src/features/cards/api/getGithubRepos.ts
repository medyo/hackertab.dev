import { useQueries, UseQueryOptions } from '@tanstack/react-query'
import { QueryConfig } from 'src/lib/react-query'
import { Repository } from 'src/types'
import { axios } from 'src/lib/axios'

const getRepos = async (tag: string, dateRange: string): Promise<Repository[]> => {
  return axios.get(`/data/v2/github/${tag}/${dateRange}.json`)
}

type QueryFnType = typeof getRepos

type UseGetReposOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
  dateRange: "daily" | "monthly" | "weekly"
}

export const useGetGithubRepos = ({ config, tags, dateRange }: UseGetReposOptions) => {
  return useQueries({
    queries: tags.map<UseQueryOptions<Repository[]>>((tag) => {
      return {
        ...config,
        queryKey: ['github', tag, dateRange],
        queryFn: () => getRepos(tag, dateRange),
      }
    })
  })
}