import { useCallback } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { MdWavingHand } from 'react-icons/md'
import { Card } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { MemoizedCardHeader } from '../CardHeader'
import { MemoizedCardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'programming' }

export function MediumCard(props: CardPropsType) {
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
  const { data, isLoading } = useGetSourceArticles({
    source: 'medium',
    tags: queryTags,
    config: {
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: Article) => (
      <ArticleItem
        item={item}
        key={item.id}
        selectedTag={selectedTag}
        analyticsTag={meta.analyticsTag}
      />
    ),
    [selectedTag, meta.analyticsTag]
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
          sortBy={sortBy}
          globalTag={GLOBAL_TAG}
          language={language || GLOBAL_TAG.value}
          sortOptions={(defaults) => [
            ...defaults,
            {
              label: 'Claps',
              value: 'points_count',
              icon: <MdWavingHand />,
            },
            {
              label: 'Comments',
              value: 'comments_count',
              icon: <BiCommentDetail />,
            },
          ]}
        />
      }
      {...props}>
      <ListPostComponent
        sortBy={sortBy as keyof Article}
        items={data}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
