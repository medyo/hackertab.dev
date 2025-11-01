import { useMemo } from 'react'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'programming' }

export function FreecodecampCard(props: CardPropsType) {
  const { meta } = props
  const { userSelectedTags } = useUserPreferences()
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[meta.value])

  const selectedTag = useMemo(
    () => userSelectedTags.find((lang) => lang.value === cardSettings?.language) || GLOBAL_TAG,
    [userSelectedTags, cardSettings]
  )

  const { data, isLoading } = useGetSourceArticles({
    source: 'freecodecamp',
    tags: [selectedTag.value],
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem
      item={item}
      key={`fcc-${index}`}
      index={index}
      selectedTag={selectedTag}
      analyticsTag={meta.analyticsTag}
    />
  )

  const HeaderTitle = () => {
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
          showDateRangeFilter={false}
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
