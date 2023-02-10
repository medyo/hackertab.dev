import React from 'react'
import { SUPPORTED_CARDS } from 'src/config'
import { CustomRssCard } from 'src/features/cards'
import { SelectedCard, SupportedCardType } from 'src/types'

export const DesktopCards = ({
  cards,
  userCustomCards,
}: {
  cards: SelectedCard[]
  userCustomCards: SupportedCardType[]
}) => {
  const AVAILABLE_CARDS = [...SUPPORTED_CARDS, ...userCustomCards]
  return (
    <>
      {cards.map((card, index) => {
        const constantCard = AVAILABLE_CARDS.find((c) => c.value === card.name)
        if (!constantCard) {
          return null
        }

        return React.createElement(constantCard?.component || CustomRssCard, {
          key: card.name,
          meta: constantCard,
          withAds: index === 0,
        })
      })}
    </>
  )
}
