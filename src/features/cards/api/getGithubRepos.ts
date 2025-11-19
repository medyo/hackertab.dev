import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Repository } from 'src/types'

const getRepos = async ({
  tags,
  dateRange,
}: {
  tags: string[]
  dateRange: string
}): Promise<Repository[]> => {
  return axios.get(`/engine/repos`, {
    params: {
      range: dateRange,
      tags: tags.join(','),
    },
  })
}

type QueryFnType = typeof getRepos

type UseGetReposOptions = {
  config?: QueryConfig<QueryFnType>
  tags: string[]
  dateRange: 'daily' | 'monthly' | 'weekly'
}

export const useGetGithubRepos = ({ config, tags, dateRange }: UseGetReposOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['github', ...tags, dateRange],
    queryFn: () => getRepos({ tags, dateRange }),
  })
}
