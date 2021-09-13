import React, { useContext, useState, useEffect } from 'react'
import hashNodeApi from '../services/hashnode'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import { format } from 'timeago.js'
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from '../components/CardLink'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { AiOutlineLike, AiTwotoneHeart } from 'react-icons/ai'

import CardItemWithActions from '../components/CardItemWithActions'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'

const ArticleItem = ({ item, index, analyticsTag }) => {
  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'hashnode'}
      index={index}
      key={index}
      item={item}
      cardItem={
        <>
          <CardLink link={item.link} analyticsSource={analyticsTag}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <AiTwotoneHeart />
                <span className="value">{item.totalReactions || 0}</span>
              </div>
            )}
            <div className="subTitle">{item.title}</div>
          </CardLink>

          {listingMode === 'normal' && (
            <>
              <p className="rowDescription">
                <span className="rowItem">
                  <MdAccessTime className={'rowTitleIcon'} />
                  {format(new Date(item.dateAdded))}
                </span>
                <span className="rowItem">
                  <BiCommentDetail className={'rowTitleIcon'} />
                  {item.replyCount || 0} comments
                </span>
                <span className="rowItem">
                  <AiTwotoneHeart className={'rowTitleIcon'} />
                  {item.totalReactions || 0} reactions
                </span>
              </p>
              <p className="rowDetails">
                <ColoredLanguagesBadge languages={item.tag_list} />
              </p>
            </>
          )}
        </>
      }
    />
  )
}

function HashNodeCard({ analyticsTag, label, icon, withAds }) {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const fetchArticles = async () => {
    const promises = userSelectedTags.map((tag) => {
      if (tag.hashnodeValues) {
        return hashNodeApi.getArticles(tag.hashnodeValues[0])
      }
      return []
    })

    const results = await Promise.allSettled(promises)
    return results
      .map((res) => {
        let value = res.value
        if (res.status === 'rejected') {
          value = []
        }
        return value
      })
      .flat()
      .sort((a, b) => b.public_reactions_count - a.public_reactions_count)
  }

  const renderItem = (item, index) => (
    <ArticleItem item={item} key={`hno-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      title={label}
      link="https://hashnode.com/">
      <ListComponent
        fetchData={fetchArticles}
        renderItem={renderItem}
        refresh={refresh}
        withAds={withAds}
      />
    </CardComponent>
  )
}

export default HashNodeCard
