import { VscTriangleUp } from 'react-icons/vsc'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'

import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { CardHeader } from '../CardHeader'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'global' }

export function RedditCard(props: CardPropsType) {
  const { meta } = props
  const { queryTags, selectedTag, cardSettings } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })
  const { isLoading, data: results } = useGetSourceArticles({
    source: 'reddit',
    tags: queryTags.map((tag) => tag.value),
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={item.id}
      index={index}
      selectedTag={selectedTag}
      analyticsTag={meta.analyticsTag}
    />
  )

  return (
    <Card
      titleComponent={
        <CardHeader label={meta.label} fallbackTag={GLOBAL_TAG} selectedTag={selectedTag} />
      }
      {...props}
      settingsComponent={
        <CardSettings
          url={meta.link}
          id={meta.value}
          globalTag={GLOBAL_TAG}
          sortBy={cardSettings?.sortBy}
          language={cardSettings?.language || GLOBAL_TAG.value}
          sortOptions={(defaults) => [
            ...defaults,
            {
              label: 'Upvotes',
              value: 'points_count',
              icon: <VscTriangleUp />,
            },
          ]}
        />
      }>
      <FloatingFilter card={meta} filters={['language']} />
      <ListPostComponent
        sortBy={cardSettings?.sortBy as keyof Article}
        items={results}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
