import { ChipsSet } from 'src/components/Elements'
import { identifyUserMaxVisibleCards, trackMaxVisibleCardsChange } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Option } from 'src/types'

export const CardsNumberSettings = () => {
  const { maxVisibleCards, setMaxVisibleCards, layout } = useUserPreferences()

  const onMaxVisibleCardsChange = (selectedChips: Option[]) => {
    if (selectedChips.length) {
      const maxVisibleCards = parseInt(selectedChips[0].value)
      setMaxVisibleCards(maxVisibleCards)
      identifyUserMaxVisibleCards(maxVisibleCards)
      trackMaxVisibleCardsChange(maxVisibleCards)
    }
  }

  if (layout === 'grid') {
    return null // Hide this setting in grid layout
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">Max number of cards to display</p>
      <div className="settingContent">
        <ChipsSet
          className={'noMargin alternative-color'}
          canSelectMultiple={false}
          options={[
            {
              label: '3 cards',
              value: '3',
            },
            {
              label: '4 cards',
              value: '4',
            },
            {
              label: '5 cards',
              value: '5',
            },
            {
              label: '6 cards',
              value: '6',
            },
          ]}
          defaultValues={[maxVisibleCards.toString()]}
          onChange={(_, selectedChips) => {
            onMaxVisibleCardsChange(selectedChips)
          }}
        />

        <p className="settingHint">
          To ensure a seamless experience, we may adjust the selected number to align with the
          resolution of your screen.
        </p>
      </div>
    </div>
  )
}
