import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { Article, CardPropsType } from 'src/types'
import ArticleItem from './ArticleItem'

export function LobstersCard({ withAds, meta }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetArticles()

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`lb-${index}`} index={index} analyticsTag={meta.analyticsTag} />
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
