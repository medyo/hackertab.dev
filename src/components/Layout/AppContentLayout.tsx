import { useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { useUserPreferences } from 'src/stores/preferences'
import { BottomNavigation } from '../Elements'
import { DesktopCards } from './DesktopCards'
import { MobileCards } from './MobileCards'

export const AppContentLayout = ({
  setShowSettings,
}: {
  setShowSettings: (value: boolean | ((prevVar: boolean) => boolean)) => void
}) => {
  const { cards, userCustomCards } = useUserPreferences()
  const [selectedCard, setSelectedCard] = useState(cards[0])

  return (
    <>
      <main className="AppContent HorizontalScroll">
        {isDesktop ? (
          <DesktopCards cards={cards} userCustomCards={userCustomCards} />
        ) : (
          <MobileCards selectedCard={selectedCard} />
        )}
      </main>

      <BottomNavigation
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        setShowSettings={setShowSettings}
      />
    </>
  )
}
