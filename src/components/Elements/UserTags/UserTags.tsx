import { TiPlus } from 'react-icons/ti'
import { useUserPreferences } from 'src/stores/preferences'

type UserTagsProps = {
  onAddClicked: () => void
}

export const UserTags = ({ onAddClicked }: UserTagsProps) => {
  const { userSelectedTags } = useUserPreferences()

  return (
    <div className="tags">
      {userSelectedTags.map((tag, index) => (
        <span key={index} className="tag">
          {tag.value}
        </span>
      ))}
      <button aria-label="Open settings" className="tag tagHoverable" onClick={onAddClicked}>
        <TiPlus className="tagIcon" />
      </button>
    </div>
  )
}
