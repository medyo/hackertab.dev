import { Card } from 'src/components/Elements/Card'
import { ListComponent } from 'src/components/List'
import { useUserPreferences } from 'src/stores/preferences'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import ArticleItem from './ArticleItem'

export function LobstersCard({ withAds, meta }: CardPropsType) {
  const { data: articles = [], isLoading, error } = useGetArticles()
  const { listingMode } = useUserPreferences()

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem item={item} key={`lb-${index}`} index={index} listingMode={listingMode} />
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
