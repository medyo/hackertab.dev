import { SUPPORTED_CARDS } from 'src/config'
import { SelectedCard } from 'src/types'
import { useUserPreferences } from 'src/stores/preferences'
import { AiOutlineMenu } from 'react-icons/ai'

type BottomNavigationProps = {
  selectedCard: SelectedCard
  setSelectedCard: (card: SelectedCard) => void
  setShowSettings: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

export const BottomNavigation = ({
  selectedCard,
  setSelectedCard,
  setShowSettings,
}: BottomNavigationProps) => {
  const { cards } = useUserPreferences()

  return (
    <div className="bottomNavigation">
      {cards.map((card) => {
        const constantCard = SUPPORTED_CARDS.find((c) => c.value === card.name)
        return (
          <a
            key={card.name}
            className={
              'navigationItem ' + (selectedCard && selectedCard.name === card.name ? 'active' : '')
            }
            href="/#"
            onClick={(e) => setSelectedCard(card)}>
            {constantCard?.icon}
          </a>
        )
      })}
      {
        <a
          className={'navigationItem '}
          href="/#"
          onClick={(e) => setShowSettings((prev: boolean) => !prev)}>
          {<AiOutlineMenu />}
        </a>
      }
    </div>
  )
}
