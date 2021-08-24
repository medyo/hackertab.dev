import React, { useContext } from 'react'
import { SUPPORTED_CARDS } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'
import { AiOutlineMenu } from 'react-icons/ai'

function BottomNavigation({ selectedCard, setSelectedCard, setShowSettings }) {
  const { cards } = useContext(PreferencesContext)

  return (
    <div className="bottomNavigation">
      {cards.map((card) => {
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
      {
        <a className={'navigationItem '} href="#" onClick={(e) => setShowSettings((prev) => !prev)}>
          {<AiOutlineMenu />}
        </a>
      }
    </div>
  )
}

export default BottomNavigation
