import React, { useContext, useEffect, useState } from 'react'
import { SUPPORTED_CARDS } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'
import BottomNavigation from './BottomNavigation'


function MobileLayout({ setShowSettings }) {
  const { cards } = useContext(PreferencesContext)
  const [selectedCard, setSelectedCard] = useState(cards[0])
  const currentCard = SUPPORTED_CARDS.find((c) => c.value === selectedCard.name)

  return (
    <div>
      {currentCard &&
        React.createElement(currentCard.component, {
          key: 'Hackernews',
          label: currentCard.label,
          analyticsTag: currentCard.analyticsTag,
          withAds: false,
        })}

      <BottomNavigation
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        setShowSettings={setShowSettings}
      />
    </div>
  )
}

export default MobileLayout
