import { useCallback } from 'react'
import { Card } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { MemoizedCardHeader } from '../CardHeader'
import { MemoizedCardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: '' }

export function FreecodecampCard(props: CardPropsType) {
  const { meta } = props
  const { ref, isVisible } = useLazyListLoad()
  const {
    queryTags,
    selectedTag,
    cardSettings: { sortBy, language } = {},
  } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })

  const { data, error, isLoading } = useGetSourceArticles({
    source: 'freecodecamp',
    tags: queryTags,
    config: {
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: Article) => <ArticleItem item={item} key={item.id} analyticsTag={meta.analyticsTag} />,
    [meta.analyticsTag]
  )

  return (
    <Card
      ref={ref}
      titleComponent={
        <MemoizedCardHeader label={meta.label} fallbackTag={GLOBAL_TAG} selectedTag={selectedTag} />
      }
      settingsComponent={
        <MemoizedCardSettings
          url={meta.link}
          id={meta.value}
          globalTag={GLOBAL_TAG}
          sortBy={sortBy}
          language={language || GLOBAL_TAG.value}
          showDateRangeFilter={false}
        />
      }
      {...props}>
      <ListPostComponent
        sortBy={sortBy as keyof Article}
        items={data}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        source={meta.value}
      />
    </Card>
  )
}
