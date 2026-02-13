import { useCallback } from 'react'
import { AiTwotoneHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { MemoizedCardHeader } from '../CardHeader'
import { MemoizedCardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: '' }

export function HashnodeCard(props: CardPropsType) {
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
    source: 'hashnode',
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
          sortBy={sortBy}
          language={language || GLOBAL_TAG.value}
          globalTag={GLOBAL_TAG}
          sortOptions={(defaults) => [
            ...defaults,
            {
              label: 'Reactions',
              value: 'points_count',
              icon: <AiTwotoneHeart />,
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
      <ListComponent<Article>
        sortBy={sortBy as keyof Article}
        error={error}
        items={data}
        isLoading={isLoading}
        renderItem={renderItem}
        source={meta.value}
      />
    </Card>
  )
}
