import React, { useContext, useState, useEffect } from 'react'
import freecodecampApi from '../services/freecodecamp'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import { format } from 'timeago.js'
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from '../components/CardLink'
import { MdAccessTime } from 'react-icons/md'

import CardItemWithActions from '../components/CardItemWithActions'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'

const ArticleItem = ({ item, index, analyticsTag }) => {

  return (
    <CardItemWithActions
      source={'freecodecamp'}
      index={index}
      key={index}
      item={{ ...item, url: item.link }}
      cardItem={
        <>
          <CardLink link={item.link} analyticsSource={analyticsTag}>
            <div className="subTitle">{item.title}</div>
          </CardLink>
            <>
              <p className="rowDescription">
                <span className="rowItem">
                  <MdAccessTime className={'rowTitleIcon'} />
                  {format(new Date(item.isoDate))}
                </span>
              </p>
              <p className="rowDetails">
                <ColoredLanguagesBadge languages={item.categories.slice(0, 4)} />
              </p>
            </>
        </>
      }
    />
  )
}

function FreeCodeCampCard({ analyticsTag, label, icon, withAds }) {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const fetchArticles = async () => {
    const promises = userSelectedTags.map((tag) => {
      if (tag.freecodecampValues) {
        return freecodecampApi.getArticles(tag.freecodecampValues[0])
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
  }

  const renderItem = (item, index) => (
    <ArticleItem item={item} key={`fcc-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      title={label}
      link="https://freecodecamp.com/news">
      <ListComponent
        fetchData={fetchArticles}
        renderItem={renderItem}
        refresh={refresh}
        withAds={withAds}
      />
    </CardComponent>
  )
}

export default FreeCodeCampCard
