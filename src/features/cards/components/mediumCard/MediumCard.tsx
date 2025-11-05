import { BiCommentDetail } from 'react-icons/bi'
import { MdWavingHand } from 'react-icons/md'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { useSelectedTags } from '../../hooks/useSelectedTags'
import { CardHeader } from '../CardHeader'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'programming' }

export function MediumCard(props: CardPropsType) {
  const { meta } = props
  const { queryTags, selectedTag, cardSettings } = useSelectedTags({
    source: meta.value,
    fallbackTag: GLOBAL_TAG,
  })
  const { data, isLoading } = useGetSourceArticles({
    source: 'medium',
    tags: queryTags.map((tag) => tag.value),
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={`md-${index}`}
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
      settingsComponent={
        <CardSettings
          url={meta.link}
          id={meta.value}
          sortBy={cardSettings?.sortBy}
          globalTag={GLOBAL_TAG}
          language={cardSettings?.language || GLOBAL_TAG.value}
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
      <FloatingFilter card={meta} filters={['language']} />
      <ListPostComponent
        sortBy={cardSettings?.sortBy as keyof Article}
        items={data}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
