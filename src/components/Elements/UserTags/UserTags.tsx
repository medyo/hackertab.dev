import { useCallback, useMemo } from 'react'
import { FaGlobe } from 'react-icons/fa'
import { TiPlus } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import { useUserPreferences } from 'src/stores/preferences'
import { useShallow } from 'zustand/shallow'

export const UserTags = () => {
  const { cards, userSelectedTags, cardsSettings, setCardSettings, clearCardSettingsLanguages } =
    useUserPreferences(
      useShallow((state) => ({
        cards: state.cards,
        userSelectedTags: state.userSelectedTags,
        cardsSettings: state.cardsSettings,
        setCardSettings: state.setCardSettings,
        clearCardSettingsLanguages: state.clearCardSettingsLanguages,
      }))
    )

  const onTagClicked = useCallback(
    (tagValue: string) => {
      if (tagValue === 'all') {
        clearCardSettingsLanguages()
        return
      }

      cards.forEach((card) => {
        setCardSettings(card.name, {
          ...cardsSettings[card.id],
          language: tagValue,
        })
      })
    },
    [cards, cardsSettings, setCardSettings]
  )

  const tagsList = useMemo(() => {
    const tags = userSelectedTags.map((tag) => ({
      label: tag.label,
      value: tag.value,
      icon: undefined,
    }))

    if (tags.length === 0) {
      return tags
    }

    return [
      {
        label: 'All',
        value: 'all',
        icon: <FaGlobe className="tagIcon" />,
      },
      ...tags,
    ]
  }, [userSelectedTags])

  return (
    <div className="tags">
      {tagsList.map((tag, index) => (
        <button key={index} className="tag tagHoverable" onClick={() => onTagClicked(tag.value)}>
          {tag.icon} {tag.label}
        </button>
      ))}
      <Link to="/settings/topics" className="tag tagHoverable" aria-label="Open settings">
        <TiPlus className="tagIcon" />
      </Link>
    </div>
  )
}
