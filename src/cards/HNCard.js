import React, {useContext} from 'react';
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
import ClickableItem from '../components/ClickableItem';
import PreferencesContext from '../preferences/PreferencesContext';


const StoryItem = ({ item, index, analyticsTag }) => {

  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={"hackernews"}
      index={index}
      item={item}
      key={index}
      cardItem={
        <>
          <p className="rowTitle">
            <CardLink link={item.url} analyticsSource={analyticsTag}>
              { listingMode === "compact" && 
                    <div className="counterWrapper">
                        <VscTriangleUp/>
                        <span className="value">{item.score}</span>
                    </div>
                }
                
                <div className="subTitle">
                    {item.title}
                </div>
            </CardLink>
          </p>
          {listingMode === "normal" && (
            <div className="rowDetails">
              <span className="rowItem hnRowItem">
                <GoPrimitiveDot className="rowItemIcon" /> {item.score} points
              </span>
              <span
                className="rowItem"
                title={new Date(item.time * 1000).toUTCString()}
              >
                <MdAccessTime className="rowItemIcon" />{" "}
                {format(new Date(item.time * 1000))}
              </span>
              <ClickableItem
                link={`https://news.ycombinator.com/item?id=${item.id}`}
                className="rowItem rowItemClickable"
                analyticsSource={analyticsTag}
              >
                <BiCommentDetail className="rowItemIcon" /> {item.descendants}{" "}
                comments
              </ClickableItem>
            </div>
          )}
        </>
      }
    />
  );
}


function HNCard({ analyticsTag, label, icon, withAds }) {
  const fetchStories = async () => {
    return await hackernewsApi.getTopStories()
  }

  const renderItem = (item, index) => (
    <StoryItem item={item} key={`st-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://news.ycombinator.com/"
      title={label}>
      <ListComponent fetchData={fetchStories} renderItem={renderItem} withAds={withAds} />
    </CardComponent>
  )
}

export default HNCard