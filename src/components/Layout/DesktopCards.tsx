import React from 'react'
import { SUPPORTED_CARDS } from 'src/config'
import { SelectedCard } from 'src/types'

export const DesktopCards = ({ cards }: { cards: SelectedCard[] }) => {
  return (
    <>
      {cards.map((card, index) => {
        const constantCard = SUPPORTED_CARDS.find((c) => c.value === card.name)
        if (!constantCard) {
          return null
        }

        return React.createElement(constantCard.component, {
          key: card.name,
          meta: constantCard,
          withAds: index === 0,
        })
      })}
    </>
  )
}
