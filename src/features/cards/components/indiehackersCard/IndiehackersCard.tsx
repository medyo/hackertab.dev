import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetIndieHackersArticles } from '../../api/getIndieHackersArticles'
import { Article, CardPropsType } from 'src/types'
import { ArticleItem } from './ArticleItem'

export function IndiehackersCard({ meta, withAds }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetIndieHackersArticles()

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`ih-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card card={meta}>
      <ListComponent
        items={articles}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
      />
    </Card>
  )
}
