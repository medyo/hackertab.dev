import useInfiniteScroll from 'react-infinite-scroll-hook'
import { PropagateLoader } from 'react-spinners'
import { useGetFeed } from 'src/features/cards'
import { trackFeedScroll } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { FeedItemData } from 'src/types'
import './feed.css'
import { FeedItem } from './feedItems/FeedItem'

export const Feed = () => {
  const { userSelectedTags } = useUserPreferences()
  const {
    data: feed,
    isLoading,
    isInitialLoading,
    hasNextPage,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetFeed({
    tags: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    config: {
      select: (data) => {
        return {
          ...data,
          pages: data.pages.map((page, pageIndex) => {
            const items = page.data
            const result: FeedItemData[] = []
            items.forEach((item, index) => {
              result.push(item)
              if (pageIndex == 0 && index === 2) {
                result.push({ type: 'ad', id: `ad-${pageIndex}-${index}` })
              }
            })

            return {
              ...page,
              data: result,
            }
          }),
        }
      },
    },
  })

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: Boolean(hasNextPage),
    onLoadMore: () => {
      fetchNextPage()
      trackFeedScroll()
    },
    disabled: Boolean(error),
    rootMargin: '0px 0px 100% 0px',
  })

  if (isInitialLoading) {
    return (
      <div className="feed">
        {Array.from({
          length: 10,
        }).map((_, index) => (
          <div className="feedItem placeholder" key={`loading-${index}`}>
            <div className="image"></div>
            <div className="line"></div>
            <div className="smallLine"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div ref={rootRef} className="feed scrollable" style={{ overflow: 'auto', maxHeight: '100%' }}>
      {(feed?.pages.flatMap((page) => page.data) || []).map((article, index) => {
        return (
          <div key={article.id} className="feedItem">
            {/* TODO: fix analytics tag */}
            <FeedItem item={article} key={article.id} index={index} analyticsTag={'test'} />
          </div>
        )
      })}
      {hasNextPage && (
        <div className="loading" ref={infiniteRef}>
          <PropagateLoader color={'#A9B2BD'} loading={true} size={8} />
        </div>
      )}
      {isFetchingNextPage && isError && <div>Error while loading more pages</div>}
    </div>
  )
}
