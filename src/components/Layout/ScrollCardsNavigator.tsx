import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { maxCardsPerRow } from 'src/config'
import { trackPageScroll } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

export const ScrollCardsNavigator = () => {
  const { cards } = useUserPreferences()
  const [leftButtonVisible, setLeftButtonVisible] = useState(false)
  const [rightButtonVisible, setRightButtonVisible] = useState(false)
  const scrollBarContainer = useRef<HTMLElement | null>(null)
  const CARDS = 'Cards'

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement

    // Prevent scrolling conflicts between CARDS and children
    if (!target.classList.contains(CARDS)) {
      return
    }

    if (cards.length <= maxCardsPerRow) {
      setLeftButtonVisible(false)
      setRightButtonVisible(false)
    } else {
      const { scrollLeft, scrollWidth, offsetWidth } = target
      setLeftButtonVisible(scrollLeft > 100)
      const scrollRight = scrollWidth - offsetWidth - Math.abs(scrollLeft)
      setRightButtonVisible(scrollRight > 100)
    }
  }

  const handleKeyboardKeys = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      scrollTo('left')
    } else if (e.key === 'ArrowRight') {
      scrollTo('right')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      e.stopPropagation()
    }
  }, [])

  useLayoutEffect(() => {
    scrollBarContainer.current = document.querySelector(`.${CARDS}`)
  }, [])

  useEffect(() => {
    scrollBarContainer.current?.addEventListener('scroll', handleScroll, true)
    window.addEventListener('keydown', handleKeyboardKeys)
    return () => {
      window.removeEventListener('keydown', handleKeyboardKeys)
      scrollBarContainer.current?.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyboardKeys])

  useEffect(() => {
    setRightButtonVisible(cards.length > maxCardsPerRow)
  }, [cards])

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollBarContainer.current) {
      return
    }
    trackPageScroll(direction)
    const { scrollLeft } = scrollBarContainer.current
    const { offsetWidth } = scrollBarContainer.current?.firstChild?.firstChild as HTMLElement
    const position = direction === 'left' ? scrollLeft - offsetWidth : scrollLeft + offsetWidth

    scrollBarContainer.current.scrollTo({
      left: position,
      behavior: 'smooth',
    })
  }

  return (
    <div className="scrollCardsNavigator">
      {leftButtonVisible && (
        <button
          aria-label="Previous cards"
          className="scrollButton"
          onClick={() => scrollTo('left')}
          style={{ left: 0 }}>
          <FiChevronLeft size={32} />
        </button>
      )}
      {rightButtonVisible && (
        <button
          aria-label="Next cards"
          className="scrollButton"
          onClick={() => scrollTo('right')}
          style={{ right: 0 }}>
          <FiChevronRight size={32} />
        </button>
      )}
    </div>
  )
}
