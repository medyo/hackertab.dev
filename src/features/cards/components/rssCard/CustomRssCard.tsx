import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useRssFeed } from '../../api/getRssFeed'
import ArticleItem from './ArticleItem'
import CardIcon from './CardIcon'

export function CustomRssCard(props: CardPropsType) {
  const { meta } = props
  const { data = [], isLoading } = useRssFeed({ feedUrl: meta.feedUrl || '' })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`rcc-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  const HeaderTitle = () => {
    return (
      <>
        <p className="maxTitle"> {meta.label} </p>
      </>
    )
  }

  return (
    <Card
      titleComponent={<HeaderTitle />}
      {...props}
      meta={{ ...meta, icon: <CardIcon url={meta.icon as string} /> }}>
      <ListComponent items={data} isLoading={isLoading} renderItem={renderItem} />
    </Card>
  )
}
