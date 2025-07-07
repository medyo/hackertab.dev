import { CardLink } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { FeedItemImage } from './FeedItemImage'

type FeedItemHeaderProps = {
  title: string
  image: string
  url: string
  source: string
  fallbackImage?: string | React.ReactNode
}

export const FeedItemHeader = ({
  title,
  url,
  source,
  image,
  fallbackImage,
}: FeedItemHeaderProps) => {
  return (
    <div className="rowTitle">
      <CardLink
        link={url}
        className="titleWithCover"
        analyticsAttributes={{
          [Attributes.TRIGERED_FROM]: 'card',
          [Attributes.TITLE]: title,
          [Attributes.LINK]: url,
          [Attributes.SOURCE]: source,
        }}>
        <FeedItemImage imageUrl={image} fallbackImage={fallbackImage} />
        <span className="subTitle">{title}</span>
      </CardLink>
    </div>
  )
}
