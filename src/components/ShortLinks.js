import React from 'react'
import { TiPlus } from 'react-icons/ti';

function ShortLinks({ userSelectedLinks, onAddClicked }) {

  return (
    <nav className="tags shortlinks">
      {userSelectedLinks.map((tag, index) => <a href={tag.value} key={index} className="tag">{tag.label}</a>)}
      <span className="tag tagHoverable" onClick={onAddClicked}><TiPlus className="tagIcon" /></span>
    </nav>
  )
}

export default ShortLinks