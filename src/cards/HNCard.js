import React from 'react';
import { format } from 'timeago.js';
import { SiYcombinator } from 'react-icons/si';
import { VscTriangleUp } from 'react-icons/vsc';
import CardComponent from "../components/CardComponent";
import ListComponent from "../components/ListComponent";
import hackernewsApi from '../services/hackernews'
import { BiCommentDetail } from "react-icons/bi"
import { MdAccessTime } from "react-icons/md"
import { GoPrimitiveDot } from "react-icons/go"
import CardLink from "../components/CardLink";
import CardItemWithActions from '../components/CardItemWithActions'


const StoryItem = ({ item, index }) => {
  const source = 'hackernews'
  return (
    <CardItemWithActions
      source={source}
      index={index}
      item={item}
      cardItem={(
        <>
          <p className="rowTitle">
          <CardLink link={item.url} analyticsSource="hn">
            <VscTriangleUp className={"rowTitleIcon"} />
            {item.title}
          </CardLink>
        </p>
        <div className="rowDetails">
          <span className="rowItem hnRowItem" ><GoPrimitiveDot className="rowItemIcon" /> {item.score} points</span>
          <span className="rowItem" title={new Date(item.time * 1000).toUTCString()}><MdAccessTime className="rowItemIcon" /> {format(new Date(item.time * 1000))}</span>
          <span className="rowItem"><BiCommentDetail className="rowItemIcon" /> {item.descendants} comments</span>
        </div>
        </>
      )}
    />
  )
}


function HNCard() {

  const fetchStories = async () => {
    return await hackernewsApi.getTopStories()
  }

  const renderStories = (stories) => {
    return stories.map((story, index) => <StoryItem item={story} index={index} />)
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