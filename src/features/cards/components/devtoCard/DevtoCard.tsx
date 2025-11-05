import { AiOutlineLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { CardHeader } from '../CardHeader'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'programming' }

export function DevtoCard(props: CardPropsType) {
  const { meta } = props

  const { queryTags, selectedTag, cardSettings } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })

  const {
    data: results,
    error,
    isLoading,
  } = useGetSourceArticles({
    source: 'devto',
    tags: queryTags.map((tag) => tag.value),
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`at-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card
      titleComponent={
        <CardHeader label={meta.label} fallbackTag={GLOBAL_TAG} selectedTag={selectedTag} />
      }
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
              label: 'Reactions',
              value: 'points_count',
              icon: <AiOutlineLike />,
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
      <FloatingFilter card={meta} filters={['language']} />
      <ListPostComponent
        sortBy={cardSettings?.sortBy as keyof Article}
        items={results}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
