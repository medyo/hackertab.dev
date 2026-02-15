import { useCallback, useMemo } from 'react'
import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { FeedItem, useGetFeed } from 'src/features/feed'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, FeedItemData } from 'src/types'
import { useShallow } from 'zustand/shallow'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { MemoizedCardSettings } from '../CardSettings'

export function AICard(props: CardPropsType) {
  const { meta } = props
  const userSelectedTags = useUserPreferences(useShallow((state) => state.userSelectedTags))
  const { ref, isVisible } = useLazyListLoad()
  const queryTags = useMemo(
    () => userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    [userSelectedTags]
  )

  const {
    data: articles,
    isLoading,
    error,
  } = useGetFeed({
    tags: queryTags,
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: FeedItemData) => <FeedItem item={item} key={item.id} analyticsTag={meta.analyticsTag} />,
    [meta.analyticsTag]
  )

  return (
    <Card
      ref={ref}
      settingsComponent={<MemoizedCardSettings url={meta.link} id={meta.value} />}
      {...props}>
      <ListComponent<FeedItemData>
        items={articles?.pages.flatMap((page) => page.data) || []}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        source={meta.value}
      />
    </Card>
  )
}
