import React from 'react';
import ClickableItem from "./ClickableItem"


function CardLink({ link, className, children, appendRef = true, analyticsAttributes }) {
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

export default CardLink
