import React from 'react'
import ClickableItem from '../../ClickableItem'

type CardLinkProps = {
  link: string
  children: React.ReactNode
  className?: string
  appendRef?: boolean
  analyticsAttributes: {
    [key: string]: string | number | undefined
  }
}
export const CardLink = ({
  link,
  children,
  className = '',
  appendRef = true,
  analyticsAttributes,
}: CardLinkProps) => {
  return (
    <ClickableItem
      link={link}
      className={'rowTitle' + (className ? ` ${className}` : '')}
      analyticsAttributes={analyticsAttributes}
      appendRef={appendRef}>
      {children}
    </ClickableItem>
  )
}
