import { useState } from 'react'
import { Feed } from 'src/features/feed'
import { DesktopBreakpoint } from 'src/providers/DesktopBreakpoint'
import { MobileBreakpoint } from 'src/providers/MobileBreakpoint'
import { useUserPreferences } from 'src/stores/preferences'
import { BottomNavigation } from '../Elements'
import { DesktopCards } from './DesktopCards'
import { MobileCards } from './MobileCards'
import { ScrollCardsNavigator } from './ScrollCardsNavigator'

export const AppContentLayout = () => {
  const { cards, userCustomCards, layout } = useUserPreferences()
  const [selectedCard, setSelectedCard] = useState(cards[0])

  return (
    <>
      <main className="AppContent">
        {layout === 'grid' ? (
          <Feed />
        ) : (
          <>
            <ScrollCardsNavigator />
            <DesktopBreakpoint>
              <DesktopCards cards={cards} userCustomCards={userCustomCards} />
            </DesktopBreakpoint>
            <MobileBreakpoint>
              <div className="Cards HorizontalScroll">
                <MobileCards selectedCard={selectedCard} />
              </div>
            </MobileBreakpoint>
          </>
        )}
      </main>
      <BottomNavigation selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
    </>
  )
}
