import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useGetIndieHackersArticles } from '../../api/getIndieHackersArticles'
import { ArticleItem } from './ArticleItem'

export function IndiehackersCard(props: CardPropsType) {
  const { meta } = props
  const { data: articles = [], isLoading, error } = useGetIndieHackersArticles()

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`ih-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  return (
    <Card {...props}>
      <ListComponent items={articles} error={error} isLoading={isLoading} renderItem={renderItem} />
    </Card>
  )
}
