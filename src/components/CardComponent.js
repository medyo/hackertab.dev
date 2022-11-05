import React from 'react'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { ref } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'

function CardComponent({ icon, title, children, fullBlock = false, link }) {
  const { openLinksNewTab } = useUserPreferences()

  const handleHeaderLinkClick = (e) => {
    e.preventDefault()
    let url = `${link}?${ref}`
    window.open(url, openLinksNewTab ? '_blank' : '_self')
  }

  return (
    <div className={'block' + (fullBlock ? ' fullBlock' : '')}>
      <div className="blockHeader">
        {icon} {title}{' '}
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

export default CardComponent
