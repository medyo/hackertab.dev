import React from 'react'
import { isDesktop } from 'react-device-detect'
import { SortableKnob } from 'react-easy-sort'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { ref } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { SupportedCardType } from 'src/types'

type CardProps = {
  children: React.ReactNode
  card: SupportedCardType
  titleComponent?: React.ReactNode
  fullBlock?: boolean
}

export const Card = ({ card, titleComponent, children, fullBlock = false }: CardProps) => {
  const { openLinksNewTab } = useUserPreferences()
  const { link, icon, label } = card
  const handleHeaderLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    let url = `${link}?${ref}`
    window.open(url, openLinksNewTab ? '_blank' : '_self')
  }

  return (
    <div className={'block' + (fullBlock ? ' fullBlock' : '')}>
      <div className="blockHeader">
        {isDesktop && (
          <SortableKnob>
            <button className="blockHeaderDragButton">
              <MdOutlineDragIndicator />
            </button>
          </SortableKnob>
        )}
        <span className="blockHeaderIcon">{icon}</span> {titleComponent || label}{' '}
        {link && (
          <a className="blockHeaderLink" href={link} onClick={handleHeaderLinkClick}>
            <BsBoxArrowInUpRight />
          </a>
        )}
      </div>

      <div className="blockContent scrollable">{children}</div>
    </div>
  )
}
