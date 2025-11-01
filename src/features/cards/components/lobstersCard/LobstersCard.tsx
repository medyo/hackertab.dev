import { BiSolidCircle } from 'react-icons/bi'
import { Card } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGetSourceArticles } from '../../api/getSourceArticles'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

export function LobstersCard(props: CardPropsType) {
  const { meta } = props
  const cardSettings = useUserPreferences((state) => state.cardsSettings[meta.value])
  const { data, isLoading, error } = useGetSourceArticles({
    source: 'lobsters',
  })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={item.id} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card
      {...props}
      settingsComponent={
        <CardSettings
          url={meta.link}
          id={meta.value}
          showLanguageFilter={false}
          sortBy={cardSettings?.sortBy}
          sortOptions={(defaults) => [
            ...defaults,
            {
              label: 'Points',
              value: 'points_count',
              icon: <BiSolidCircle />,
            },
          ]}
        />
      }>
      <ListPostComponent
        sortBy={cardSettings?.sortBy as keyof Article}
        items={data}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
      />
    </Card>
  )
}
