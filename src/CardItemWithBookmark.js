import React, { useState, useContext } from 'react'
import PreferencesContext from './contexts/PreferencesContext'
import { BsFillBookmarksFill } from "react-icons/bs";


export default function CardItemWithBookmark ({ cardItem, item, index, source }) {
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
  }
  return (
    <div key={`${source}-${index}`} className="blockRowWithBookmark" d={index}>
      <div>
        {cardItem}
      </div>
      <div className="bookmarkBtnWrapper">
        <span className={`bookmarkBtn ${isBookmarked ? "active" : ''}`} onClick={onBookmarkClick}>
          <BsFillBookmarksFill />
        </span>
      </div>
    </div>
  )
}