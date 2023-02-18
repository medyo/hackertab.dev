import React from 'react'
import { SUPPORTED_CARDS } from 'src/config'
import { CustomRssCard } from 'src/features/cards'
import { useUserPreferences } from 'src/stores/preferences'
import { SelectedCard } from 'src/types'

export const MobileCards = ({ selectedCard }: { selectedCard: SelectedCard }) => {
  const { userCustomCards } = useUserPreferences()
  const currentCard = [...SUPPORTED_CARDS, ...userCustomCards].find(
    (c) => c.value === selectedCard.name
  )

  return currentCard
    ? React.createElement(currentCard?.component || CustomRssCard, {
        key: currentCard.value,
        meta: currentCard,
        withAds: true,
      })
    : null
}
