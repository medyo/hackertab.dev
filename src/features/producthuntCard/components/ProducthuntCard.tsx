import CardComponent from '../../../components/CardComponent'
import { ListComponent } from 'src/components/List'
import { useGetArticles } from '../api/getArticles'
import { ArticleType, CardPropsType } from 'src/types'
import { ProductHuntPlaceholder } from 'src/components/placeholders'
import ArticleItem from './ArticleItem';



export function ProductHuntCard(props: CardPropsType) {
  const { label, icon, withAds } = props
  const { data: articles = [], isLoading, error } = useGetArticles()

  const renderItem = (item: ArticleType, index: number) => (
    <ArticleItem item={item} key={`lb-${index}`} index={index}  />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://producthunt.com/"
      title={label}>
      <ListComponent
        items={articles}
        error={error}
        isLoading={isLoading}
        renderItem={renderItem}
        withAds={withAds}
        placeholder={<ProductHuntPlaceholder />}
      />
    </CardComponent>
  )
}


