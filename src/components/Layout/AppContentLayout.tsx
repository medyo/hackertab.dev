import { useState } from 'react'
import { BottomNavigation } from '../Elements'
import { isDesktop } from 'react-device-detect'
import { useUserPreferences } from 'src/stores/preferences'
import { MobileCards } from './MobileCards'
import { DesktopCards } from './DesktopCards'

export const AppContentLayout = ({
  setShowSettings,
}: {
  setShowSettings: (value: boolean | ((prevVar: boolean) => boolean)) => void
}) => {
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
