import { useMemo } from 'react'
import { VscTriangleUp } from 'react-icons/vsc'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'

import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

const GLOBAL_TAG = { label: 'Global', value: 'global' }

export function RedditCard(props: CardPropsType) {
  const { meta } = props
  const cardSettings = useUserPreferences((state) => state.cardsSettings[meta.value])
  const { userSelectedTags } = useUserPreferences()
  const selectedTag = useMemo(
    () => userSelectedTags.find((lang) => lang.value === cardSettings?.language) || GLOBAL_TAG,
    [userSelectedTags, cardSettings]
  )

  const { isLoading, data: results } = useGetSourceArticles({
    source: 'reddit',
    tags: [selectedTag.value],
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

  const HeaderTitle = () => {
    return (
      <div>
        Reddit{' '}
        {selectedTag.value != GLOBAL_TAG.value && (
          <span className="blockHeaderHighlight">{selectedTag.label}</span>
        )}
      </div>
    )
  }

  return (
    <Card
      titleComponent={<HeaderTitle />}
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
