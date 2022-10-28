import CardComponent from '../../../components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useUserPreferences } from 'src/stores/preferences'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import ArticleItem from './ArticleItem';


export function LobstersCard(props: CardPropsType) {
  const { label, icon, withAds } = props
  const { data: articles = [], isLoading, error } = useGetArticles()
  const { listingMode } = useUserPreferences()

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem item={item} key={`lb-${index}`} index={index} listingMode={listingMode} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://lobste.rs/"
      title={label}>
      <ListComponent
        items={articles}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
      />
    </CardComponent>
  )
}


