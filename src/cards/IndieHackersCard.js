import React, { useContext } from 'react'
import { VscTriangleUp } from 'react-icons/vsc'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import indiehackersApi from '../services/indiehackers'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import CardLink from '../components/CardLink'
import CardItemWithActions from '../components/CardItemWithActions'
import PreferencesContext from '../preferences/PreferencesContext'
import { FaChevronUp } from 'react-icons/fa'
import { format } from 'timeago.js'

const StoryItem = ({ item, index, analyticsTag }) => {
  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'indiehackers'}
      index={index}
      item={item}
      key={index}
      cardItem={
        <>
          <p className="rowTitle">
            <CardLink link={item.url} analyticsSource={analyticsTag}>
              {listingMode === 'compact' && (
                <span className="counterWrapper">
                  <VscTriangleUp />
                  <span className="value">{item.score}</span>
                </span>
              )}

              <span className="subTitle">{item.title}</span>
            </CardLink>
          </p>
          {listingMode === 'normal' && (
            <div className="rowDetails">
              <span className="rowItem inRowItem">
                <FaChevronUp className="rowItemIcon" /> {item.likes} points
              </span>
              <span className="rowItem">
                <MdAccessTime className="rowItemIcon" /> {format(new Date(item.published_at))}
              </span>
              <span className="rowItem">
                <BiCommentDetail className="rowItemIcon" /> {item.comments} comments
              </span>
            </div>
          )}
        </>
      }
    />
  )
}

function IndieHackersCard({ analyticsTag, label, icon, withAds }) {
  const fetchStories = async () => {
    return await indiehackersApi.getTopStories()
  }

  const renderItem = (item, index) => (
    <StoryItem item={item} key={`st-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://indiehackers.com/"
      title={label}>
      <ListComponent fetchData={fetchStories} renderItem={renderItem} withAds={withAds} />
    </CardComponent>
  )
}

export default IndieHackersCard
