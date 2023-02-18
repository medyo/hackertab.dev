import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { maxCardsPerRow } from 'src/config'
import { trackPageScroll } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

export const ScrollCardsNavigator = () => {
  const { cards } = useUserPreferences()
  const [leftButtonVisible, setLeftButtonVisible] = useState(true)
  const [rightButtonVisible, setRightButtonVisible] = useState(true)
  const scrollBarContainer = useRef<HTMLElement | null>(null)

  const handleScroll = (e: Event) => {
    if (cards.length <= maxCardsPerRow) {
      setLeftButtonVisible(false)
      setRightButtonVisible(false)
    } else {
      const { scrollLeft, scrollWidth, offsetWidth } = e.target as HTMLElement
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
    }
  }, [])

  useLayoutEffect(() => {
    scrollBarContainer.current = document.querySelector('.Cards')
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
    setLeftButtonVisible(false)
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
    <>
      {leftButtonVisible && (
        <button onClick={() => scrollTo('left')} className="scrollButton" style={{ left: 0 }}>
          <FiChevronLeft size={32} />
        </button>
      )}
      {rightButtonVisible && (
        <button onClick={() => scrollTo('right')} className="scrollButton" style={{ right: 0 }}>
          <FiChevronRight size={32} />
        </button>
      )}
    </>
  )
}
