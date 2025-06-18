import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useFeatureFlags } from 'src/stores/featureFlags'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType, FeedItem } from 'src/types'
import { useGetAIArticles } from '../../api/getAIArticles'
import ArticleItem from './ArticleItem'

const SHOW_PANEL_FEATURE_FLAG = 'ai_panel_shown'

export function AICard({ meta, withAds }: CardPropsType) {
  const { userSelectedTags } = useUserPreferences()
  const { isDone, markDone } = useFeatureFlags()
  const {
    data: articles,
    isLoading,
    error,
  } = useGetAIArticles({
    tags: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
    },
  })

  const renderItem = (item: FeedItem, index: number) => (
    <ArticleItem item={item} key={`ai-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card card={meta} withAds={withAds}>
      <ListComponent<FeedItem>
        items={articles?.pages.flatMap((page) => page.data) || []}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
