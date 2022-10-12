import React from 'react'

function ProductHuntPlaceholder() {
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

export default ProductHuntPlaceholder
