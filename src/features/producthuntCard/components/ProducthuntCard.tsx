import { Card } from 'src/components/Elements/Card'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import ArticleItem from './ArticleItem'

export function ProductHuntCard({ meta, withAds }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetArticles()

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem item={item} key={`ph-${index}`} index={index} />
  )

  return (
    <Card card={meta}>
      <ListComponent
        items={articles}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
        placeholder={<ProductHuntPlaceholder />}
      />
    </Card>
  )
}
