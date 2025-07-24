import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { FeedItem, useGetFeed } from 'src/features/feed'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, FeedItemData } from 'src/types'

export function AICard(props: CardPropsType) {
  const { meta, withAds, knob } = props
  const { userSelectedTags } = useUserPreferences()
  const {
    data: articles,
    isLoading,
    error,
  } = useGetFeed({
    tags: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
    },
  })

  const renderItem = (item: FeedItemData, index: number) => (
    <FeedItem item={item} key={`ai-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card {...props}>
      <ListComponent<FeedItemData>
        items={articles?.pages.flatMap((page) => page.data) || []}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
