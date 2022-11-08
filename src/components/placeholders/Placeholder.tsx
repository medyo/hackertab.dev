import React from 'react'

export const Placeholder = () => {
  return (
    <div className="cardPlaceholder">
      <span className="line"></span>
      <span className="smallLine" />
      <div className="details">
        <span className="detail" />
        <span className="detail" style={{ width: '78px' }} />
        <span className="detail" style={{ width: '78px' }} />
      </div>
    </div>
  )
}
