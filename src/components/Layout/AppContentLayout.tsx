import { useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { useUserPreferences } from 'src/stores/preferences'
import { BottomNavigation } from '../Elements'
import { ScrollCardsNavigator } from './'
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
    <section>
      <main className="AppContent">
        <ScrollCardsNavigator />
        {isDesktop ? (
          <DesktopCards cards={cards} userCustomCards={userCustomCards} />
        ) : (
          <div className="HorizontalScroll">
            <MobileCards selectedCard={selectedCard} />
          </div>
        )}
      </main>
      <BottomNavigation
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        setShowSettings={setShowSettings}
      />
    </section>
  )
}
