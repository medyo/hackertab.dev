import { BaseItemPropsType, FeedItemData } from 'src/types'
import { ArticleFeedItem } from './ArticleFeedItem'
import { ProductFeedItem } from './ProductFeedItem'
import { RepoFeedItem } from './RepoFeedItem'

export const FeedItem = (props: BaseItemPropsType<FeedItemData>) => {
  const { item, index, analyticsTag } = props

  if (item.type === 'github') {
    return <RepoFeedItem item={item} index={index} analyticsTag={analyticsTag} />
  }

  if (item.type === 'producthunt') {
    return <ProductFeedItem item={item} index={index} analyticsTag={analyticsTag} />
  }

  if (item.type === 'post') {
    return <ArticleFeedItem item={item} index={index} analyticsTag={analyticsTag} />
  }

  return null
}
