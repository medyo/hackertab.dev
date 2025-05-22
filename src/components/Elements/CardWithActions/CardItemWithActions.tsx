import React, { useEffect, useState } from 'react'
import { BiBookmarkMinus, BiBookmarkPlus, BiShareAlt } from 'react-icons/bi'
import { MdBugReport } from 'react-icons/md'
import { reportLink } from 'src/config'
import { ShareModal } from 'src/features/shareModal'
import { ShareModalData } from 'src/features/shareModal/types'
import { Attributes, trackLinkBookmark, trackLinkUnBookmark } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseEntry } from 'src/types'
import { CircleButton } from '../Button'

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
  const [shareModalData, setShareModalData] = useState<ShareModalData>()

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

  const onShareModalClicked = () => {
    setShareModalData({ title: item.title, link: item.url, source: source })
  }

  const onReportClicked = () => {
    const tags = useUserPreferences
      .getState()
      .userSelectedTags.map((tag) => tag.label.toLocaleLowerCase())
    window.open(`${reportLink}?tags=${tags.join(',')}&url=${item.url}`, '_blank')
  }

  return (
    <div key={`${source}-${index}`} className="blockRow">
      <ShareModal
        showModal={setShareModalData !== undefined}
        closeModal={() => setShareModalData(undefined)}
        shareData={shareModalData}
      />
      {cardItem}
      <div className={`flex items-end justify-end gap-1 ${isBookmarked ? 'active' : ''}`}>
        {source === 'ai' && (
          <CircleButton
            size="sm"
            className={`blockActionButton`}
            onClick={onReportClicked}
            aria-label="Report item">
            <MdBugReport />
          </CircleButton>
        )}
        <CircleButton
          size="sm"
          className={`blockActionButton`}
          onClick={onShareModalClicked}
          aria-label="Open share modal">
          <BiShareAlt />
        </CircleButton>
        <CircleButton
          size="sm"
          variant={isBookmarked ? 'darkfocus' : 'secondary'}
          className={`blockActionButton ${isBookmarked ? 'active' : ''}`}
          onClick={onBookmarkClick}
          aria-label="Bookmark item">
          {!isBookmarked ? <BiBookmarkPlus /> : <BiBookmarkMinus />}
        </CircleButton>
      </div>
    </div>
  )
}
