import React, { useState } from 'react'
import { SUPPORTED_CARDS } from 'src/config'
import BottomNavigation from './BottomNavigation'
import { isDesktop } from 'react-device-detect'
import { useUserPreferences } from 'src/stores/preferences'

function MobileCards({ selectedCard }) {
  const currentCard = SUPPORTED_CARDS.find((c) => c.value === selectedCard.name)
  return (
    currentCard &&
    React.createElement(currentCard.component, {
      key: currentCard.value,
      label: currentCard.label,
      analyticsTag: currentCard.analyticsTag,
      withAds: true,
    })
  )
}

function DesktopCards({ cards }) {
  return cards.map((card, index) => {
    const constantCard = SUPPORTED_CARDS.find((c) => c.value === card.name)
    return React.createElement(constantCard.component, {
      key: card.name,
      label: constantCard.label,
      icon: constantCard.icon,
      analyticsTag: constantCard.analyticsTag,
      withAds: index === 0,
    })
  })
}

function AppContentLayout({ setShowSettings }) {
  const { cards } = useUserPreferences()
  const [selectedCard, setSelectedCard] = useState(cards[0])

  return (
    <>
      <main className="AppContent scrollable">
        {isDesktop ? <DesktopCards cards={cards} /> : <MobileCards selectedCard={selectedCard} />}
      </main>

      <BottomNavigation
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        setShowSettings={setShowSettings}
      />
    </>
  )
}

export default AppContentLayout
