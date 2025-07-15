import { BsRssFill } from 'react-icons/bs'
import { SUPPORTED_CARDS } from 'src/config/supportedCards'
import { useUserPreferences } from 'src/stores/preferences'
import { SelectedCard } from 'src/types'

type BottomNavigationProps = {
  selectedCard: SelectedCard
  setSelectedCard: (card: SelectedCard) => void
}

export const BottomNavigation = ({ selectedCard, setSelectedCard }: BottomNavigationProps) => {
  const { cards, userCustomCards } = useUserPreferences()
  const AVAILABLE_CARDS = [...SUPPORTED_CARDS, ...userCustomCards]
  return (
    <div className="bottomNavigation">
      {cards.map((card) => {
        const constantCard = AVAILABLE_CARDS.find((c) => c.value === card.name)

        return (
          <button
            key={card.name}
            className={
              'navigationItem ' + (selectedCard && selectedCard.name === card.name ? 'active' : '')
            }
            onClick={() => setSelectedCard(card)}>
            {card.type === 'supported'
              ? constantCard?.icon
              : <img src={constantCard?.icon} alt="" /> || <BsRssFill className="rss" />}
          </button>
        )
      })}
    </div>
  )
}
