import { Card } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useRssFeed } from '../../api/getRssFeed'
import ArticleItem from './ArticleItem'
import CardIcon from './CardIcon'

export function CustomRssCard({ meta, withAds }: CardPropsType) {
  const { data = [], isLoading } = useRssFeed({ feedUrl: meta.feedUrl || '' })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`rcc-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  const HeaderTitle = () => {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <p className="maxTitle"> {meta.label} </p>
      </div>
    )
  }

  return (
    <Card
      card={{ ...meta, icon: <CardIcon url={meta.icon as string} /> }}
      titleComponent={<HeaderTitle />}>
      <ListComponent items={data} isLoading={isLoading} renderItem={renderItem} withAds={withAds} />
    </Card>
  )
}
