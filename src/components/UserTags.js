import React from 'react'
import { TiPlus } from 'react-icons/ti';

function UserTags({ userSelectedTags, onAddClicked }) {

  return (
    <nav className="tags">
      {userSelectedTags.map((tag, index) => <span key={index} className="tag">{tag.value}</span>)}
      <span className="tag tagHoverable" onClick={onAddClicked}><TiPlus className="tagIcon" /></span>
    </nav>
  )
}

export default UserTags