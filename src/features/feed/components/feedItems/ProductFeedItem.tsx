import { SiProducthunt } from 'react-icons/si'
import { VscTriangleUp } from 'react-icons/vsc'
import { CardItemWithActions } from 'src/components/Elements'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType, ProductHuntFeedItemData } from 'src/types'
import { FeedItemHeader } from '../FeedItemHeader'

export const ProductFeedItem = (props: BaseItemPropsType<ProductHuntFeedItemData>) => {
  const { item, index, analyticsTag, className } = props
  const { listingMode } = useUserPreferences()

  return (
    <div className={className}>
      <CardItemWithActions
        source={analyticsTag}
        index={index}
        item={item}
        key={index}
        cardItem={
          <>
            <FeedItemHeader item={item} />
            <div className="rowDetails">
              <span className="rowItem">{item.tagline}</span>
            </div>
            {listingMode === 'compact' && (
              <div className="rowDetails">
                <span className="rowItem verticalAligned">
                  <SiProducthunt color="#D65736" /> Product Hunt
                </span>
              </div>
            )}
            {listingMode === 'normal' && (
              <div className="rowDetails">
                <span className="rowItem verticalAligned">
                  <SiProducthunt color="#D65736" /> Product Hunt
                </span>
                <span className="rowItem verticalAligned">
                  <VscTriangleUp className="rowItemIcon" /> {item.votes_count || 0} upvotes
                </span>
              </div>
            )}
          </>
        }
      />
    </div>
  )
}
