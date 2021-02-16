import React from 'react';
import { format } from 'timeago.js';
import { SiYcombinator } from 'react-icons/si';
import { VscTriangleUp } from 'react-icons/vsc';
import CardComponent from "./CardComponent";
import ListComponent from "./ListComponent";
import hackernewsApi from '../services/hackernews'
import { BiCommentDetail } from "react-icons/bi"
import { MdAccessTime } from "react-icons/md"
import { GoPrimitiveDot } from "react-icons/go"
import CardLink from "./CardLink"


function HNCard() {

  const fetchStories = async () => {
    return await hackernewsApi.getTopStories()
  }

  const renderStories = (stories) => {
    return stories.map((story, index) =>
      <div key={index} className="blockRow">
        <p className="rowTitle">
          <CardLink link={story.url} analyticsSource="hn">
            <VscTriangleUp className={"rowTitleIcon"} />
            {story.title}
          </CardLink>
        </p>
        <div className="rowDetails">
          <span className="rowItem hnRowItem" ><GoPrimitiveDot className="rowItemIcon" /> {story.score} points</span>
          <span className="rowItem" title={new Date(story.time * 1000).toUTCString()}><MdAccessTime className="rowItemIcon" /> {format(new Date(story.time * 1000))}</span>
          <span className="rowItem"><BiCommentDetail className="rowItemIcon" /> {story.descendants} comments</span>
        </div>
      </div>
    )
  }

  return (
    <CardComponent
    icon={<SiYcombinator className="blockHeaderIcon" color="#FB6720" />}
    title={"HackerNews"}
    > 
      <ListComponent
        fetchData={fetchStories}
        renderData={renderStories}
      />
    </CardComponent>
  )
}

export default HNCard