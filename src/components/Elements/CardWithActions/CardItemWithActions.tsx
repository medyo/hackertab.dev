import React, { useCallback, useEffect, useState } from 'react'
import { BiBookmarkMinus, BiBookmarkPlus, BiShareAlt } from 'react-icons/bi'
import { ShareModal } from 'src/features/shareModal'
import { ShareModalData } from 'src/features/shareModal/types'
import { Attributes, trackLinkBookmark, trackLinkUnBookmark } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'

type CardItemWithActionsProps = {
  item: {
    title: string
    url: string
    id: string
  }
  showBookmarkAction?: boolean
  source: string
  cardItem: React.ReactNode
  customActions?: Array<{
    label: string
    Component: React.ReactNode
  }>
  sourceType?: 'rss' | 'supported'
}

export const CardItemWithActions = ({
  cardItem,
  item,
  source,
  showBookmarkAction = true,
  customActions,
  sourceType = 'supported',
}: CardItemWithActionsProps) => {
  const [shareModalData, setShareModalData] = useState<ShareModalData>()

  const { bookmarkPost, unbookmarkPost, userBookmarks } = useBookmarks()
  const [isBookmarked, setIsBookmarked] = useState(
    userBookmarks.some((bm) => bm.source === source && bm.url === item.url)
  )

  const onBookmarkClick = useCallback(() => {
    const itemToBookmark = {
      title: item.title,
      url: item.url,
      source,
      sourceType: sourceType ?? 'rss',
    }
    if (isBookmarked) {
      unbookmarkPost(itemToBookmark)
    } else {
      bookmarkPost(itemToBookmark)
    }
    setIsBookmarked(!isBookmarked)
    const analyticsAttrs = {
      [Attributes.TRIGERED_FROM]: 'card',
      [Attributes.TITLE]: item.title,
      [Attributes.LINK]: item.url,
      [Attributes.SOURCE]: source,
    }
    if (isBookmarked) {
      trackLinkUnBookmark(analyticsAttrs)
    } else {
      trackLinkBookmark(analyticsAttrs)
    }
  }, [isBookmarked, item, source, sourceType, bookmarkPost, unbookmarkPost])

  useEffect(() => {
    setIsBookmarked(userBookmarks.some((bm) => bm.source === source && bm.url === item.url))
  }, [userBookmarks, source, item])

  const onShareModalClicked = useCallback(() => {
    setShareModalData({ title: item.title, link: item.url, source: source })
  }, [item.title, item.url, source])
  return (
    <div key={item.id} className="blockRow">
      <ShareModal
        showModal={setShareModalData !== undefined}
        closeModal={() => setShareModalData(undefined)}
        shareData={shareModalData}
      />
      {cardItem}
      <div className={`blockActions ${isBookmarked ? 'active' : ''} `}>
        <button
          className={`blockActionButton `}
          onClick={onShareModalClicked}
          aria-label="Open share modal">
          <BiShareAlt />
        </button>

        {customActions &&
          customActions.map((action) => (
            <div key={action.label} aria-label={action.label}>
              {action.Component}
            </div>
          ))}

        {showBookmarkAction && (
          <button
            className={`blockActionButton ${isBookmarked ? 'active' : ''}`}
            onClick={onBookmarkClick}
            aria-label="Bookmark item">
            {!isBookmarked ? <BiBookmarkPlus /> : <BiBookmarkMinus />}
          </button>
        )}
      </div>
    </div>
  )
}
