import React from 'react'
import { TiPlus } from 'react-icons/ti';
import { useUserPreferences } from 'src/stores/preferences'
import { enhanceTags } from 'src/utils/DataEnhancement'

function UserTags({ onAddClicked }) {
  const { userSelectedTags } = useUserPreferences()

  return (
    <nav className="tags">
      {enhanceTags(userSelectedTags).map((tag, index) => (
        <span key={index} className="tag">
          {tag.value}
        </span>
      ))}
      <span className="tag tagHoverable" onClick={onAddClicked}>
        <TiPlus className="tagIcon" />
      </span>
    </nav>
  )
}

export default UserTags