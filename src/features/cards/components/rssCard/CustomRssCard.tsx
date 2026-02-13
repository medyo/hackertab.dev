import { useCallback } from 'react'
import { Card } from 'src/components/Elements'
import { ListPostComponent } from 'src/components/List/ListPostComponent'
import { Article, CardPropsType } from 'src/types'
import { useRssFeed } from '../../api/getRssFeed'
import { useLazyListLoad } from '../../hooks/useLazyListLoad'
import { MemoizedCardSettings } from '../CardSettings'
import ArticleItem from './ArticleItem'
import CardIcon from './CardIcon'

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <>
      <p className="maxTitle"> {title} </p>
    </>
  )
}

export function CustomRssCard(props: CardPropsType) {
  const { meta } = props
  const { ref, isVisible } = useLazyListLoad()
  const { data = [], isLoading } = useRssFeed({
    feedUrl: meta.feedUrl || '',
    config: {
      enabled: isVisible,
    },
  })

  const renderItem = useCallback(
    (item: Article) => <ArticleItem item={item} key={item.id} analyticsTag={meta.analyticsTag} />,
    [meta.analyticsTag]
  )

  return (
    <Card
      ref={ref}
      titleComponent={<HeaderTitle title={meta.label} />}
      {...props}
      meta={{ ...meta, icon: <CardIcon url={meta.icon as string} /> }}
      settingsComponent={
        <MemoizedCardSettings
          url={meta.link}
          id={meta.value}
          showDateRangeFilter={false}
          showLanguageFilter={false}
        />
      }>
      <ListPostComponent items={data} isLoading={isLoading} renderItem={renderItem} source={meta.value} />
    </Card>
  )
}
