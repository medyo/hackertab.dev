import { useState } from 'react'
import { DesktopBreakpoint } from 'src/providers/DesktopBreakpoint'
import { MobileBreakpoint } from 'src/providers/MobileBreakpoint'
import { useUserPreferences } from 'src/stores/preferences'
import { lazyImport } from 'src/utils/lazyImport'
import { BottomNavigation } from '../Elements'
import { DesktopCards } from './DesktopCards'
import { MobileCards } from './MobileCards'
import { ScrollCardsNavigator } from './ScrollCardsNavigator'
const { Feed } = lazyImport(() => import('src/features/feed'), 'Feed')

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
            <BottomNavigation selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
          </>
        )}
      </main>
    </>
  )
}
