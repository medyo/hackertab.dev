import React, { useContext } from 'react'
import { SUPPORTED_CARDS } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'

function BottomNavigation({ selectedCard, setSelectedCard }) {
  const { cards } = useContext(PreferencesContext)

  return (
    <div className="bottomNavigation">
      {cards.map((card, index) => {
        const constantCard = SUPPORTED_CARDS.find((c) => c.value === card.name)
        return (
          <a
            className={'navigationItem ' + (selectedCard.name == card.name ? 'active' : '')}
            href="#"
            onClick={(e) => setSelectedCard(card)}>
            {constantCard.icon}
          </a>
        )
      })}
    </div>
  )
}

export default BottomNavigation
