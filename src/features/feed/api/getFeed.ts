import { useInfiniteQuery } from '@tanstack/react-query'
import { axios } from 'src/lib/axios'
import { InfiniteQueryConfig } from 'src/lib/react-query'
import { FeedItemData } from 'src/types'

type Response = {
  data: FeedItemData[]
  metadata: {
    next: string | null
    hasNextPage: boolean
  }
}
const getFeed = async ({
  tags,
  next,
}: {
  tags: string[]
  next?: string | null
}): Promise<Response> => {
  return axios.get('/engine/v2/feed', {
    params: {
      tags: [...tags].sort().join(','),
      limit: 21,
      next,
    },
  })
}

type QueryFnType = typeof getFeed

type UseGetArticlesOptions = {
  tags: string[]
  config?: InfiniteQueryConfig<QueryFnType>
}

export const useGetFeed = ({ tags, config }: UseGetArticlesOptions) => {
  return useInfiniteQuery<Response>({
    ...config,
    queryKey: ['feed', 'v2', tags.join(',')],
    queryFn: ({ pageParam }) => getFeed({ tags, next: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.metadata.hasNextPage ? JSON.stringify(lastPage.metadata.next) : undefined
    },
  })
}
