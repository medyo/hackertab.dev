import React from 'react'
import { TiPlus } from 'react-icons/ti';

function ShortLinks({ userSelectedLinks, onAddClicked }) {

  return (
    <nav className="tags shortlinks">
      {
        userSelectedLinks.map((tag, index) => {
          let pattern = /^((http|https):\/\/)/;
          if(!pattern.test(tag.value)) tag.value = "https://" + tag.value;
          let hostname = new URL(tag.value).hostname
          return (<a title={tag.value} href={tag.value} key={index} className="tag link-tag">
            <img src={`https://icons.duckduckgo.com/ip3/${hostname}.ico`} ></img>
          </a>)
        })
      }
      <span className="tag add-link-tag tagHoverable" onClick={onAddClicked}><TiPlus className="tagIcon" /></span>
    </nav>
  )
}

export default ShortLinks