import React from 'react'

export const ProductHuntPlaceholder = () => {
  return (
    <div className="cardPlaceholder mediaCardPlaceholder">
      <span className="media" />
      <div className="cardContent">
        <span className="line" />
        <span className="smallLine" />
        <div className="details">
          <span className="detail" />
          <span className="detail" style={{ width: '120px' }} />
        </div>
      </div>
      <div className="cardUpvote" />
    </div>
  )
}
