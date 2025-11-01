import { BiCommentDetail } from 'react-icons/bi'
import { VscTriangleUp } from 'react-icons/vsc'
import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import { useUserPreferences } from 'src/stores/preferences'
import { Article, CardPropsType } from 'src/types'
import { useGeProductHuntProducts } from '../../api/getProductHuntProducts'
import { CardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'

export function ProductHuntCard(props: CardPropsType) {
  const { meta } = props
  const cardSettings = useUserPreferences((state) => state.cardsSettings?.[meta.value])

  const {
    data: products = [],
    isLoading,
    error,
  } = useGeProductHuntProducts({
    date: new Date().toISOString().split('T')[0],
    config: {
      staleTime: 900000, //15 minutes
      cacheTime: 3600000, // 1 Day
    },
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
          sortOptions={[
            {
              label: 'Upvotes',
              value: 'points_count',
              icon: <VscTriangleUp />,
            },
            {
              label: 'Comments',
              value: 'comments_count',
              icon: <BiCommentDetail />,
            },
          ]}
        />
      }>
      <ListComponent
        items={products}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        placeholder={<ProductHuntPlaceholder />}
      />
    </Card>
  )
}
