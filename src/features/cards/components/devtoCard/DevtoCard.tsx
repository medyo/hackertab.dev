import { useMemo } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BiCommentDetail } from 'react-icons/bi'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'programming' }

export function DevtoCard(props: CardPropsType) {
  const { meta } = props
  const { userSelectedTags } = useUserPreferences()
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[meta.value])

  const selectedTag = useMemo(() => {
    return userSelectedTags.find((lang) => lang.value === cardSettings?.language) || GLOBAL_TAG
  }, [userSelectedTags, cardSettings])

  const {
    data: results,
    error,
    isLoading,
  } = useGetSourceArticles({
    source: 'devto',
    tags: [selectedTag.value],
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={`at-${index}`}
      index={index}
      analyticsTag={meta.analyticsTag}
      selectedTag={selectedTag}
    />
  )

  const HeaderTitle = () => {
    if (selectedTag.value === GLOBAL_TAG.value) {
      return <>{meta.label}</>
    }
    return (
      <>
        {meta.label}
        <span className="blockHeaderHighlight">{selectedTag.label}</span>
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
