import { AiOutlineMenu } from 'react-icons/ai'
import { BsRssFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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
              : <img src={constantCard?.icon as string} alt="" /> || <BsRssFill className="rss" />}
          </button>
        )
      })}
      {
        <button
          aria-label="Open settings"
          className={'navigationItem '}
          onClick={() => {
            navigate('/settings/general')
          }}>
          {<AiOutlineMenu />}
        </button>
      }
    </div>
  )
}
