import { SiYcombinator } from 'react-icons/si';
import { VscTriangleUp } from 'react-icons/vsc';
import CardComponent from "./CardComponent"
import React from "react";


function NewsCard({ data, title, icon }) {

  return (
    <CardComponent
      icon={icon}
      title={title}
      data={data} >
      {
        data && data.map((item, index) =>
          <div key={index} className="blockRow">
            <p className="rowTitle">
              <VscTriangleUp className={"rowTitleIcon"} />
              {item.title}
            </p>
            <p className="rowDescription">{item.description}</p>
          </div>
        )
      }
    </CardComponent>
  )
}

export default NewsCard