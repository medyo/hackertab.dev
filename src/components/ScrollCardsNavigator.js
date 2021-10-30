import React, { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { APP } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'

function ScrollCardsNavigator() {
  const { cards } = useContext(PreferencesContext)
  const [leftButtonVisible, setLeftButtonVisible] = useState(true)
  const [rightButtonVisible, setRightButtonVisible] = useState(true)
  const scrollBarContainer = useRef(null)

  const handleScroll = (e) => {
    const { scrollLeft, scrollWidth, offsetWidth } = e.target
    setLeftButtonVisible(scrollLeft > 0)
    const scrollRight = scrollWidth - offsetWidth - Math.abs(scrollLeft)
    setRightButtonVisible(scrollRight > 0)
  }

  const handleKeyboardKeys = (e) => {
    if (e.keyCode == 37) {
      scrollTo('left')
    } else if (e.keyCode == 39) {
      scrollTo('right')
    }
  }

  useLayoutEffect(() => {
    scrollBarContainer.current = document.querySelector('.AppContent')
  }, [])
  useEffect(() => {
    scrollBarContainer.current.addEventListener('scroll', handleScroll, true)
    window.addEventListener('keydown', handleKeyboardKeys)
    return () => {
      window.removeEventListener('keydown', handleEsc)
      scrollBarContainer.current.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setLeftButtonVisible(false)
    setRightButtonVisible(cards.length > APP.maxCardsPerRow)
  }, [cards])

  const scrollTo = (direction) => {
    if (!scrollBarContainer.current) {
      return
    }
    const { offsetWidth, scrollLeft } = scrollBarContainer.current.children[0]
    let extraPadding = 32 // Should be calculated dynamically

    const position =
      direction === 'left'
        ? scrollLeft - offsetWidth - extraPadding
        : scrollLeft + offsetWidth + extraPadding

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

export default ScrollCardsNavigator
