import React from "react";

function CardComponent({ icon, title, children, fullBlock }) {

  return (
    <div className={"block" + (fullBlock ? " fullBlock" : '')}>
      <div className="blockHeader">{icon} {title}</div>

      <div className="blockContent">
        {children}
      </div>
    </div>
  )
}

export default CardComponent
