import { MdBugReport } from 'react-icons/md'
import { TbTestPipe } from 'react-icons/tb'
import { VscClose } from 'react-icons/vsc'
import { Card, Panel } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useFeatureFlags } from 'src/stores/featureFlags'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGetAIArticles } from '../../api/getAIArticles'
import ArticleItem from './ArticleItem'

const SHOW_PANEL_FEATURE_FLAG = 'ai_panel_shown'

export function AICard({ meta, withAds }: CardPropsType) {
  const { userSelectedTags } = useUserPreferences()
  const { isDone, markDone } = useFeatureFlags()
  const {
    data: articles = [],
    isLoading,
    error,
  } = useGetAIArticles({
    userTopics: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
    },
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`ai-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card card={meta}>
      <ListComponent
        items={articles}
        error={error}
        header={
          !isDone(SHOW_PANEL_FEATURE_FLAG) && (
            <Panel
              variant="information"
              title={
                <>
                  <span>
                    <TbTestPipe size={18} /> Alpha feature
                  </span>
                  <button
                    className="closeBtn"
                    onClick={() => markDone(SHOW_PANEL_FEATURE_FLAG, true)}
                    aria-label="Mark feature as read">
                    <VscClose size="24" />
                  </button>
                </>
              }
              body={
                <>
                  This AI-powered card compiles articles from various sources. If you spot
                  irrelevant content, hover an item then use{' '}
                  <MdBugReport size={18} style={{ verticalAlign: 'middle' }} /> to report it.
                </>
              }
            />
          )
        }
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
