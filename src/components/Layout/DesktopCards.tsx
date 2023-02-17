import SortableList, { SortableItem } from 'react-easy-sort'
import { SUPPORTED_CARDS } from 'src/config'
import { CustomRssCard } from 'src/features/cards'
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

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    updateCardOrder(oldIndex, newIndex)
  }

  return (
    <SortableList
      as="div"
      onSortEnd={onSortEnd}
      className="AppContent HorizontalScroll"
      draggedItemClassName="draggedBlock">
      {cards
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
                <Component key={card.name} meta={constantCard} withAds={index === 0} />
              </div>
            </SortableItem>
          )
        })}
    </SortableList>
  )
}
