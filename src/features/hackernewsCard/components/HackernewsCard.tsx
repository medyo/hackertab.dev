import CardComponent from '../../../components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from '../../card/types'
import ArticleItem from './ArticleItem'

export function HackernewsCard(props: CardPropsType) {
  const { label, icon, withAds } = props
  const { data: articles = [], isLoading, error } = useGetArticles()

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem item={item} key={`st-${index}`} index={index} listingMode={'normal'} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://news.ycombinator.com/"
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


