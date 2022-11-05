import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { Article, CardPropsType } from 'src/types'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import ArticleItem from './ArticleItem'

export function ProductHuntCard({ meta, withAds }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetArticles()

  const renderItem = (item: Article, index: number) => (
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
