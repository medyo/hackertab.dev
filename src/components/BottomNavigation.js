import React from 'react'
import { SUPPORTED_CARDS } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { AiOutlineMenu } from 'react-icons/ai'

function BottomNavigation({ selectedCard, setSelectedCard, setShowSettings }) {
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
            {constantCard.icon}
          </a>
        )
      })}
      {
        <a
          className={'navigationItem '}
          href="/#"
          onClick={(e) => setShowSettings((prev) => !prev)}>
          {<AiOutlineMenu />}
        </a>
      }
    </div>
  )
}

export default BottomNavigation
