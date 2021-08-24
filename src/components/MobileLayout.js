import React, { useContext, useEffect, useState } from 'react'
import { SUPPORTED_CARDS } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'
import BottomNavigation from './BottomNavigation'

function MobileLayout({}) {
  const { cards } = useContext(PreferencesContext)
  const [selectedCard, setSelectedCard] = useState(cards[0])

  const currentCard = SUPPORTED_CARDS.find((c) => c.value === selectedCard.name)
  console.log('currentCard', currentCard)
  useEffect(() => {
    console.log('selectedCard', selectedCard)
  }, [selectedCard])

  return (
    <div>
      {currentCard &&
        React.createElement(currentCard.component, {
          key: 'Hackernews',
          label: currentCard.label,
          analyticsTag: currentCard.analyticsTag,
          withAds: false,
        })}
      <BottomNavigation selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
    </div>
  )
}

export default MobileLayout
