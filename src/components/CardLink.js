import React from 'react';
import ClickableItem from "./ClickableItem"


function CardLink({ link, className, children, analyticsSource, appendRef = true }) {
  return (
    <ClickableItem link={link}
      className={'rowTitle' + (className ? ` ${className}` : '')}
      analyticsSource={analyticsSource}
      appendRef={appendRef}>
      {children}
    </ClickableItem>
  )
}

export default CardLink
