import React from 'react'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { ref } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { SupportedCard } from 'src/config'

type CardProps = {
  children: React.ReactNode
  card: SupportedCard
  titleComponent?: React.ReactNode
  fullBlock?: boolean
}
export const Card = ({
  card: { link, icon, label },
  titleComponent,
  children,
  fullBlock = false,
}: CardProps) => {
  const { openLinksNewTab } = useUserPreferences()

  const handleHeaderLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    let url = `${link}?${ref}`
    window.open(url, openLinksNewTab ? '_blank' : '_self')
  }

  return (
    <div className={'block' + (fullBlock ? ' fullBlock' : '')}>
      <div className="blockHeader">
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
