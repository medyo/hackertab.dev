import React, { useState, useContext, useEffect } from 'react'
import PreferencesContext from '../contexts/PreferencesContext'
import { BiBookmarkPlus } from "react-icons/bi";
import { BiBookmarkMinus } from "react-icons/bi";
import { trackBookmarkFrom, trackUnbookmarkFrom } from "../utils/Analytics"

export default function CardItemWithActions({ cardItem, item, index, source }) {
  const { dispatcher, userBookmarks } = useContext(PreferencesContext)
  const [isBookmarked, setIsBookmarked] = useState(userBookmarks.some(bm => bm.source == source && bm.url == item.url))
  const onBookmarkClick = () => {
    dispatcher({
      type: isBookmarked ? 'unBookmarkItem' : 'bookmarkItem',
      value: {
        title: item.title,
        url: item.url,
        source
      }
    })
    setIsBookmarked(!isBookmarked)

    if (isBookmarked) {
      trackUnbookmarkFrom(source)
    } else {
      trackBookmarkFrom(source)
    }

  }
  useEffect(() => {
    setIsBookmarked(
      userBookmarks.some(bm => bm.source == source && bm.url == item.url)
    )
  }, [userBookmarks])


  return (
    <div key={`${source}-${index}`} className="blockRow">
      {cardItem}
      <div className={`blockActions ${isBookmarked ? "active" : ''} `}>
        <button className={`blockActionButton ${isBookmarked ? "active" : ''}`} onClick={onBookmarkClick}>
          {!isBookmarked ? <BiBookmarkPlus /> : <BiBookmarkMinus />}
        </button>
      </div>
    </div>
  )
}
