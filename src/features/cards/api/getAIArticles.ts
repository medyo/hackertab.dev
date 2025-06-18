import { useInfiniteQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { InfiniteQueryConfig } from 'src/lib/react-query'
import { FeedItem } from 'src/types'

type Response = {
  data: FeedItem[]
  metadata: {
    next: string | null
    hasNextPage: boolean
  }
}
const getAIArticles = async ({
  tags,
  next,
}: {
  tags: string[]
  next?: string | null
}): Promise<Response> => {
  return axios.get('/TO_ADD', {
    auth: {
      username: 'hidden',
      password: 'hidden',
    },
    params: {
      tags: [...tags].sort().join(','),
      limit: 21,
      next,
    },
  })
}

type QueryFnType = typeof getAIArticles

type UseGetArticlesOptions = {
  tags: string[]
  config?: InfiniteQueryConfig<QueryFnType>
}

export const useGetAIArticles = ({ tags, config }: UseGetArticlesOptions) => {
  return useInfiniteQuery<Response>({
    ...config,
    queryKey: ['feed', 'v2', tags.join(',')],
    queryFn: ({ pageParam }) => getAIArticles({ tags, next: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.metadata.hasNextPage ? JSON.stringify(lastPage.metadata.next) : undefined
    },
  })
}
