import { useMemo, useRef } from 'react'
//import SortableList, { SortableItem } from 'react-easy-sort'
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { clsx } from 'clsx'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { SUPPORTED_CARDS } from 'src/config/supportedCards'
import { CustomRssCard } from 'src/features/cards'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { trackPageDrag } from 'src/lib/analytics'
import { DesktopBreakpoint } from 'src/providers/DesktopBreakpoint'
import { useUserPreferences } from 'src/stores/preferences'
import { SelectedCard, SupportedCardType } from 'src/types'

type SortableItemProps = {
  id: string
  card: SupportedCardType
  withAds: boolean
}

const SortableItem = ({ id, card, withAds }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging, transform, transition } = useSortable({
    id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const Component = card.component || CustomRssCard

  return (
    <div ref={setNodeRef} style={style}>
      <Component
        meta={card}
        className={clsx(isDragging && 'draggedBlock')}
        withAds={withAds}
        knob={
          <DesktopBreakpoint>
            <button className="blockHeaderDragButton" {...attributes} {...listeners}>
              <MdOutlineDragIndicator />
            </button>
          </DesktopBreakpoint>
        }
      />
    </div>
  )
}

export const DesktopCards = ({
  cards,
  userCustomCards,
}: {
  cards: SelectedCard[]
  userCustomCards: SupportedCardType[]
}) => {
  const AVAILABLE_CARDS = [...SUPPORTED_CARDS, ...userCustomCards]
  const { updateCardOrder } = useUserPreferences()
  const cardsWrapperRef = useRef<HTMLDivElement>(null)
  const { adsConfig } = useRemoteConfigStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = () => {
    cardsWrapperRef.current?.classList.add('snapDisabled')
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const previousCard = cards.find((card) => card.name === active.id)
      const newCard = cards.find((card) => card.name === over?.id)
      if (!previousCard || !newCard) {
        return
      }

      const oldIndex = previousCard.id
      const newIndex = newCard.id

      updateCardOrder(oldIndex, newIndex)
      trackPageDrag()
    }

    cardsWrapperRef.current?.classList.remove('snapDisabled')
  }

  const memoCards = useMemo(() => {
    return cards
      .map((card) => {
        const constantCard = AVAILABLE_CARDS.find((c) => c.value === card.name)
        if (!constantCard) {
          return null
        }

        return {
          card: constantCard,
          id: card.name,
        }
      })
      .filter(Boolean) as { id: string; card: SupportedCardType }[]
  }, [cards])

  return (
    <div ref={cardsWrapperRef} className="Cards HorizontalScroll">
      <DndContext
        sensors={sensors}
        autoScroll={false}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}>
        <SortableContext
          items={memoCards.map(({ id }) => id)}
          strategy={horizontalListSortingStrategy}>
          {memoCards.map(({ id, card }, index) => {
            return <SortableItem key={id} id={id} card={card} withAds={index === 0} />
          })}
        </SortableContext>
      </DndContext>
    </div>
  )
}
