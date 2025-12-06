import { useCallback } from 'react'
import { TiPlus } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useUserPreferences } from 'src/stores/preferences'
import { useShallow } from 'zustand/shallow'

export const UserTags = () => {
  const { cards, userSelectedTags, cardsSettings, setCardSettings } = useUserPreferences(
    useShallow((state) => ({
      cards: state.cards,
      userSelectedTags: state.userSelectedTags,
      cardsSettings: state.cardsSettings,
      setCardSettings: state.setCardSettings,
    }))
  )

  const onTagClicked = useCallback((tagValue: string) => {
    cards.forEach((card) => {
      setCardSettings(card.name, {
        ...cardsSettings[card.id],
        language: tagValue,
      })
    })
  }, [])

  return (
    <div className="tags">
      {userSelectedTags.map((tag, index) => (
        <button key={index} className="tag tagHoverable" onClick={() => onTagClicked(tag.value)}>
          {tag.label}
        </button>
      ))}
      <Link to="/settings/topics" className="tag tagHoverable" aria-label="Open settings">
        <TiPlus className="tagIcon" />
      </Link>
    </div>
  )
}
