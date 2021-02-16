import React, { useContext } from 'react';
import { APP } from "../Constants";
import PreferencesContext from '../contexts/PreferencesContext'
import { trackOpenLinkFrom } from "../utils/Analytics"

function CardLink({ link, className, children, analyticsSource }) {

  const { openLinksNewTab } = useContext(PreferencesContext)

  const handleClick = (e) => {
    e.preventDefault();
    
    trackOpenLinkFrom(analyticsSource)

    if (!link) {
      return
    }

    const url = new URL(link);
    let utmUrl = link

    // Url has some query params
    if (url.search) {
      utmUrl += `&${APP.ref}`
    } else {
      utmUrl += `?${APP.ref}`
    }

    window.open(utmUrl, openLinksNewTab ? "_blank" : "_self")

  };


  return (
    <a href={link} className={["rowTitle", className].join(" ")} onClick={handleClick} >
      {children}
    </a>
  )
}

export default CardLink
