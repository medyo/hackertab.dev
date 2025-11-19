import { useQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { ExtractFnReturnType, QueryConfig } from 'src/lib/react-query'
import { Article } from 'src/types'

const getArticles = async ({
  source,
  tags,
}: {
  source: string
  tags?: string[]
}): Promise<Article[]> => {
  return axios.get(`/engine/feeds`, {
    params: {
      source,
      ...(tags?.length ? { tags: tags.join(',') } : {}),
    },
  })
}

type QueryFnType = typeof getArticles

type UseGetArticlesOptions = {
  config?: QueryConfig<QueryFnType>
  source: string
  tags?: string[]
}

export const useGetSourceArticles = ({ config, source, tags }: UseGetArticlesOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [source, ...(tags || [])],
    queryFn: () => getArticles({ source, tags }),
  })
}
