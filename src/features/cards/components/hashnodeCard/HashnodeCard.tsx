import { AiTwotoneHeart } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'programming' }

export function HashnodeCard(props: CardPropsType) {
  const { meta } = props
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[meta.value])
  const { userSelectedTags } = useUserPreferences()
  const selectedTag =
    userSelectedTags.find((lang) => lang.value === cardSettings?.language) || GLOBAL_TAG

  const { data, isLoading } = useGetSourceArticles({
    source: 'hashnode',
    tags: [selectedTag.value],
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={`hno-${index}`}
      index={index}
      selectedTag={selectedTag}
      analyticsTag={meta.analyticsTag}
    />
  )

  const HeaderTitle = () => {
    return (
      <>
        {meta.label}
        {selectedTag.value != GLOBAL_TAG.value && (
          <span className="blockHeaderHighlight">{selectedTag.label}</span>
        )}
      </>
    )
  }

  return (
    <Card
      titleComponent={<HeaderTitle />}
      settingsComponent={
        <CardSettings
          url={meta.link}
          id={meta.value}
          sortBy={cardSettings?.sortBy}
          language={cardSettings?.language || GLOBAL_TAG.value}
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
