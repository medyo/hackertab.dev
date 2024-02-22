import { useState } from 'react'
import { useUserPreferences } from 'src/stores/preferences'
import { BottomNavigation } from '../Elements'
import { ScrollCardsNavigator } from './'
import { MobileCards } from './MobileCards'

export const AppContentLayout = () => {
  const { cards, userCustomCards } = useUserPreferences()
  const [selectedCard, setSelectedCard] = useState(cards[0])

  return (
    <>
      <main className="AppContent">
        <ScrollCardsNavigator />
        <div className="Cards HorizontalScroll">
          <MobileCards selectedCard={selectedCard} />
        </div>
      </main>
      <BottomNavigation selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
    </>
  )
}
