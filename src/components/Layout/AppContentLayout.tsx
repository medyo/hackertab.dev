import { useState } from 'react'
import { useUserPreferences } from 'src/stores/preferences'
import { BottomNavigation } from '../Elements'
import { MobileCards } from './MobileCards'

export const AppContentLayout = () => {
  const { cards, userCustomCards } = useUserPreferences()
  const [selectedCard, setSelectedCard] = useState(cards[0])

  return (
    <>
      <main className="AppContent">
        <MobileCards selectedCard={selectedCard} />
        <BottomNavigation selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      </main>
    </>
  )
}
