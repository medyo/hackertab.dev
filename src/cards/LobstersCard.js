import React, { useContext } from 'react'
import { format } from 'timeago.js'
import { VscTriangleUp } from 'react-icons/vsc'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import lobstersApi from '../services/lobsters'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { GoPrimitiveDot } from 'react-icons/go'
import CardLink from '../components/CardLink'
import CardItemWithActions from '../components/CardItemWithActions'
import ClickableItem from '../components/ClickableItem'
import PreferencesContext from '../preferences/PreferencesContext'
import { Attributes } from 'src/lib/analytics'

const StoryItem = ({ item, index }) => {
  const { listingMode } = useContext(PreferencesContext)
  return (
    <CardItemWithActions
      source={'lobsters'}
      index={index}
      item={item}
      key={index}
      cardItem={
        <>
          <p className="rowTitle">
            <CardLink
              link={item.url}
              analyticsAttributes={{
                [Attributes.POINTS]: item.score,
                [Attributes.TRIGERED_FROM]: 'card',
                [Attributes.TITLE]: item.title,
                [Attributes.LINK]: item.url,
                [Attributes.SOURCE]: 'lobsters',
              }}>
              {listingMode === 'compact' && (
                <div className="counterWrapper">
                  <VscTriangleUp />
                  <span className="value">{item.score}</span>
                </div>
              )}

              <div className="subTitle">{item.title}</div>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem lobstersRowItem">
                <GoPrimitiveDot className="rowItemIcon" /> {item.score} points
              </span>
              <span className="rowItem" title={new Date(item.created_at).toUTCString()}>
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.created_at))}
              </span>
              <ClickableItem
                link={item.comments_url}
                className="rowItem rowItemClickable"
                analyticsSource={analyticsTag}>
                <BiCommentDetail className="rowItemIcon" /> {item.comment_count} comments
              </ClickableItem>
            </div>
          )}
        </>
      }
    />
  )
}

function LobstersCard({ analyticsTag, label, icon, withAds }) {
  const fetchStories = async () => {
    return await lobstersApi.getTopStories()
  }

  const renderItem = (item, index) => (
    <StoryItem item={item} key={`lb-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://lobste.rs/"
      title={label}>
      <ListComponent fetchData={fetchStories} renderItem={renderItem} withAds={withAds} />
    </CardComponent>
  )
}

export default LobstersCard
