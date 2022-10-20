import React, { useState, useContext, useEffect } from 'react'
import PreferencesContext from '../preferences/PreferencesContext'
import { BiBookmarkPlus } from "react-icons/bi";
import { BiBookmarkMinus } from "react-icons/bi";
import { trackLinkBookmark, trackLinkUnBookmark, Attributes } from 'src/lib/analytics'

export default function CardItemWithActions({ cardItem, item, index, source }) {
  const { dispatcher, userBookmarks } = useContext(PreferencesContext)
  const [isBookmarked, setIsBookmarked] = useState(
    userBookmarks.some((bm) => bm.source == source && bm.url == item.url)
  )
  const onBookmarkClick = () => {
    dispatcher({
      type: isBookmarked ? 'unBookmarkItem' : 'bookmarkItem',
      value: {
        title: item.title,
        url: item.url,
        source,
      },
    })
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
    setIsBookmarked(userBookmarks.some((bm) => bm.source == source && bm.url == item.url))
  }, [userBookmarks])

  return (
    <div key={`${source}-${index}`} className="blockRow">
      {cardItem}
      <div className={`blockActions ${isBookmarked ? 'active' : ''} `}>
        <button
          className={`blockActionButton ${isBookmarked ? 'active' : ''}`}
          onClick={onBookmarkClick}>
          {!isBookmarked ? <BiBookmarkPlus /> : <BiBookmarkMinus />}
        </button>
      </div>
    </div>
  )
}
