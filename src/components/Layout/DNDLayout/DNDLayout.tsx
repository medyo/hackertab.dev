import { useLayoutEffect, useRef } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { SearchBarWithLogo } from 'src/components/Elements'
import './DNDLayout.css'

export const DNDLayout = () => {
  const cardsLayoutContainer = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    cardsLayoutContainer.current = document.querySelector('.AppContent')
  }, [])

  const onScrollToCardsLayoutClicked = () => {
    if (!cardsLayoutContainer.current) {
      return
    }
    cardsLayoutContainer.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="DNDContent">
      <div className="searchWidget">
        <SearchBarWithLogo />
      </div>

      <button className="scrollToCardsLayout" onClick={() => onScrollToCardsLayoutClicked()}>
        Scroll for Dev News
        <BsChevronDown className="icon" />
      </button>
    </section>
  )
}
