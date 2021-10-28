import React, { useState, useReducer, useEffect, useContext, useRef } from 'react'
import { TiChevronRight, TiChevronLeft } from 'react-icons/ti'

function ScrollCardsNavigator() {
  const scrollTo = (direction) => {
    const scrollContainer = document.querySelector('.AppContent')
    if (!scrollContainer) {
      return
    }
    const cardWidth = scrollContainer.children[0].offsetWidth
    const position =
      direction === 'left'
        ? scrollContainer.scrollLeft - cardWidth
        : scrollContainer.scrollLeft + cardWidth

    scrollContainer.scrollTo({
      left: position,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <button onClick={() => scrollTo('left')} className="scrollButton" style={{ left: 0 }}>
        <TiChevronLeft size={32} />
      </button>
      <button onClick={() => scrollTo('right')} className="scrollButton" style={{ right: 0 }}>
        <TiChevronRight size={32} />
      </button>
    </>
  )
}

export default ScrollCardsNavigator
