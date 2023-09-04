import React, { useEffect, useState } from 'react'
import { BiBookmarkMinus, BiBookmarkPlus, BiShareAlt } from 'react-icons/bi'
import { ShareModal } from 'src/features/shareModal'
import { Attributes, trackLinkBookmark, trackLinkUnBookmark } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { BaseEntry } from 'src/types'

type CardItemWithActionsProps = {
  item: BaseEntry
  index: number
  source: string
  cardItem: React.ReactNode
  sourceType?: 'rss' | 'supported'
}

export const CardItemWithActions = ({
  cardItem,
  item,
  index,
  source,
  sourceType = 'supported',
}: CardItemWithActionsProps) => {
  const [showModal, setShowModal] = useState(false)
  const [link, setLink] = useState('')
  const { bookmarkPost, unbookmarkPost, userBookmarks } = useBookmarks()
  const [isBookmarked, setIsBookmarked] = useState(
    userBookmarks.some((bm) => bm.source === source && bm.url === item.url)
  )
  const onBookmarkClick = () => {
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
  }
  useEffect(() => {
    setIsBookmarked(userBookmarks.some((bm) => bm.source === source && bm.url === item.url))
  }, [userBookmarks, source, item])
  const handleOpenModal = () => {
    setShowModal(!showModal)
    setLink(item.url)
  }
  return (
    <div key={`${source}-${index}`} className="blockRow">
      <ShareModal showModal={showModal} setShowModal={handleOpenModal} link={link} />

      {cardItem}
      <div className={`blockActions ${isBookmarked ? 'active' : ''} `}>
        <button
          className={`blockActionButton ${isBookmarked ? 'active' : ''}`}
          onClick={onBookmarkClick}>
          {!isBookmarked ? <BiBookmarkPlus /> : <BiBookmarkMinus />}
        </button>
        <button className={`blockActionButton `} onClick={handleOpenModal}>
          <BiShareAlt />
        </button>
      </div>
    </div>
  )
}
