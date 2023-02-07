import { BsRssFill } from 'react-icons/bs'
import { Card, FloatingFilter } from 'src/components/Elements'
import { ListComponent } from 'src/components/List'
import { Article, CardPropsType } from 'src/types'
import { useRssFeed } from '../../api/getRssFeed'
import ArticleItem from './ArticleItem'

export function CustomRssCard({ meta, withAds }: CardPropsType) {
  const { data = [], isLoading } = useRssFeed({ feedUrl: meta.feedUrl || '' })

  const renderItem = (item: Article, index: number) => (
    <ArticleItem item={item} key={`fcc-${index}`} index={index} analyticsTag={meta.analyticsTag} />
  )

  const HeaderTitle = () => {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <span> {meta.label} </span>
      </div>
    )
  }

  return (
    <Card card={{ ...meta, icon: <BsRssFill /> }} titleComponent={<HeaderTitle />}>
      <FloatingFilter card={meta} filters={['language']} />
      <ListComponent items={data} isLoading={isLoading} renderItem={renderItem} withAds={withAds} />
    </Card>
  )
}
