import React from 'react'
import { ref } from 'src/config'
import { trackLinkOpen } from 'src/lib/analytics'

import { useUserPreferences } from 'src/stores/preferences'

type ClickableItemProps = {
  link: string
  className?: string
  children: React.ReactNode
  analyticsAttributes: {
    [key: string]: string | number | undefined
  }
  appendRef?: boolean
}
export const ClickableItem = ({
  link,
  className,
  children,
  analyticsAttributes,
  appendRef = false,
}: ClickableItemProps) => {
  const { openLinksNewTab } = useUserPreferences()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    trackLinkOpen(analyticsAttributes)

    if (!link) {
      return
    }

    if (appendRef) {
      const url = new URL(link)
      let utmUrl = link

      // Url has some query params
      if (url.search) {
        utmUrl += `&${ref}`
      } else {
        utmUrl += `?${ref}`
      }

      window.open(utmUrl, openLinksNewTab ? '_blank' : '_self')
    } else {
      window.open(link, openLinksNewTab ? '_blank' : '_self')
    }
  }

  return (
    <a href={link} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
