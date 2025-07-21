import { useEffect, useRef } from 'react'
import SortableList, { SortableItem } from 'react-easy-sort'
import { SUPPORTED_CARDS } from 'src/config/supportedCards'
import { CustomRssCard } from 'src/features/cards'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { trackPageDrag } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { SelectedCard, SupportedCardType } from 'src/types'

export const DesktopCards = ({
  cards,
  userCustomCards,
}: {
  cards: SelectedCard[]
  userCustomCards: SupportedCardType[]
}) => {
  const AVAILABLE_CARDS = [...SUPPORTED_CARDS, ...userCustomCards]
  const { updateCardOrder } = useUserPreferences()
  const scrollHolderRef = useRef<HTMLElement | null>(null)
  const { adsConfig } = useRemoteConfigStore()

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    updateCardOrder(oldIndex, newIndex)
    trackPageDrag()
    if (newIndex === 0 || (oldIndex > 3 && newIndex < 3)) {
      scrollHolderRef.current?.scrollTo(0, 0)
    }
  }

  useEffect(() => {
    scrollHolderRef.current = document.querySelector('.Cards')
  }, [])

  return (
    <SortableList
      as="div"
      onSortEnd={onSortEnd}
      lockAxis="x"
      className="Cards HorizontalScroll"
      draggedItemClassName="draggedBlock">
      {[...cards]
        .sort((a, b) => a.id - b.id)
        .map((card, index) => {
          const constantCard = AVAILABLE_CARDS.find((c) => c.value === card.name)
          if (!constantCard) {
            return null
          }

          const Component = constantCard?.component || CustomRssCard

          return (
            <SortableItem key={card.name}>
              <div>
                <Component meta={constantCard} withAds={index === adsConfig.columnPosition} />
              </div>
            </SortableItem>
          )
        })}
    </SortableList>
  )
}
