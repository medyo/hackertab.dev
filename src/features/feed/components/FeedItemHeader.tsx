import { CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { FeedItem as FeedItemType } from 'src/types'
import { FeedItemImage } from './FeedItemImage'

type FeedItemHeaderProps = {
  item: FeedItemType
  fallbackImage?: string | React.ReactNode
}

export const FeedItemHeader = ({ item, fallbackImage }: FeedItemHeaderProps) => {
  return (
    <div className="rowTitle">
      <CardLink
        link={item.url}
        className="titleWithCover"
        analyticsAttributes={{
          [Attributes.TRIGERED_FROM]: 'card',
          [Attributes.TITLE]: item.title,
          [Attributes.LINK]: item.url,
          [Attributes.SOURCE]: item.source,
        }}>
        <FeedItemImage imageUrl={item.image} fallbackImage={fallbackImage} />
        <span className="subTitle">{item.title}</span>
      </CardLink>
    </div>
  )
}
