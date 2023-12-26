import { TiPlus } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useUserPreferences } from 'src/stores/preferences'

export const UserTags = () => {
  const { userSelectedTags } = useUserPreferences()

  return (
    <div className="tags">
      {userSelectedTags.map((tag, index) => (
        <span key={index} className="tag">
          {tag.value}
        </span>
      ))}
      <Link to="/settings/topics" className="tag tagHoverable" aria-label="Open settings">
        <TiPlus className="tagIcon" />
      </Link>
    </div>
  )
}
