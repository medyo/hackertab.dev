import React, { useContext, useState } from 'react'
import { SUPPORTED_CARDS } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'
import BottomNavigation from './BottomNavigation'
import { isDesktop } from 'react-device-detect'

function MobileCards({ setShowSettings }) {
  const { cards } = useContext(PreferencesContext)
  const [selectedCard, setSelectedCard] = useState(cards[0])
  const currentCard = SUPPORTED_CARDS.find((c) => c.value === selectedCard.name)

  return (
    <>
      {currentCard &&
        React.createElement(currentCard.component, {
          key: currentCard.value,
          label: currentCard.label,
          analyticsTag: currentCard.analyticsTag,
          withAds: false,
        })}
      <BottomNavigation
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        setShowSettings={setShowSettings}
      />
    </>
  )
}

function DesktopCards({}) {
  const { cards } = useContext(PreferencesContext)
  return cards.map((card, index) => {
    const constantCard = SUPPORTED_CARDS.find((c) => c.value === card.name)
    return React.createElement(constantCard.component, {
      key: card.name,
      label: constantCard.label,
      icon: constantCard.icon,
      analyticsTag: constantCard.analyticsTag,
      withAds: index == 0,
    })
  })
}

function AppContentLayout({ setShowSettings }) {
  return (
    <main className="AppContent scrollable">
      {isDesktop ? <DesktopCards /> : <MobileCards setShowSettings={setShowSettings} />}
    </main>
  )
}

export default AppContentLayout
