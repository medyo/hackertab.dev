import { trackLinkOpen } from 'src/lib/analytics'
import React, { useContext } from 'react'
import { APP } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'

const ClickableItem = ({ link, className, children, analyticsAttributes, appendRef = true }) => {
  const { openLinksNewTab } = useContext(PreferencesContext)

  const handleClick = (e) => {
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
        utmUrl += `&${APP.ref}`
      } else {
        utmUrl += `?${APP.ref}`
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

export default ClickableItem
