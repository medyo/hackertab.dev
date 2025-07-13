import { useState } from 'react'
import { DesktopBreakpoint } from 'src/providers/DesktopBreakpoint'
import { MobileBreakpoint } from 'src/providers/MobileBreakpoint'
import { useUserPreferences } from 'src/stores/preferences'
import { BottomNavigation } from '../Elements'
import { DesktopCards } from './DesktopCards'
import { MobileCards } from './MobileCards'
import { ScrollCardsNavigator } from './ScrollCardsNavigator'

export const CardsLayout = () => {
  const { cards, userCustomCards } = useUserPreferences()
  const [selectedCard, setSelectedCard] = useState(cards[0])
  return (
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
  )
}
