import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useGetLobstersArticles } from '../../api/getLobstersArticles'
import ArticleItem from './ArticleItem'

export function LobstersCard({ withAds, meta }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetLobstersArticles()

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`lb-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card card={meta} withAds={withAds}>
      <ListComponent items={articles} error={error} isLoading={isLoading} renderItem={renderItem} />
    </Card>
  )
}
