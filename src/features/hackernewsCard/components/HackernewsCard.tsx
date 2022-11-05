import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { useUserPreferences } from 'src/stores/preferences'
import { useGetArticles } from '../api/getArticles'
import { Article, CardPropsType } from 'src/types'
import ArticleItem from './ArticleItem'

export function HackernewsCard({ meta, withAds }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetArticles()
  const { listingMode } = useUserPreferences()

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`hn-${index}`} index={index} listingMode={listingMode} />
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
