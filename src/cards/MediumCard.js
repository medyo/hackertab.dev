import React, { useContext, useState, useEffect } from 'react'
import mediumApi from '../services/medium'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import { format } from 'timeago.js'
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from '../components/CardLink'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { AiTwotoneHeart } from 'react-icons/ai'
import { IoMdHand } from 'react-icons/io'
import CardItemWithActions from '../components/CardItemWithActions'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import SelectableCard from '../components/SelectableCard'
import { GLOBAL_TAG, MY_LANGUAGES_TAG, MAX_MERGED_ITEMS_PER_LANGUAGE } from '../Constants'
import { mergeMultipleDataSources } from '../utils/DataUtils'
import { trackCardLanguageChange } from '../utils/Analytics'

const ArticleItem = ({ item, index, analyticsTag }) => {
  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'medium'}
      index={index}
      key={index}
      item={{ ...item, url: item.link }}
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
                  {format(new Date(item.latestPublishedAt))}
                </span>
                <span className="rowItem">
                  <BiCommentDetail className={'rowTitleIcon'} />
                  {item.replyCount || 0} comments
                </span>
                <span className="rowItem">
                  <IoMdHand className={'rowTitleIcon'} />
                  {item.totalReactions || 0} claps
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

function MediumCard({ analyticsTag, label, icon, withAds }) {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags, cardsSettings, dispatcher } = preferences
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [refresh, setRefresh] = useState(true)
  const [cacheCardData, setCacheCardData] = useState({})

  useEffect(() => {
    if (selectedLanguage) {
      dispatcher({
        type: 'setCardSettings',
        value: { card: label, language: selectedLanguage.label.toLowerCase() },
      })
      setRefresh(!refresh)
    }
  }, [selectedLanguage])

  const fetchArticles = async () => {
    if (!selectedLanguage) {
      return []
    }
    if (!selectedLanguage.label) {
      throw Error(`Medium does not support ${selectedLanguage.label}.`)
    }

    let data = []
    const cacheKey = `${selectedLanguage.label}`

    // Cache found
    if (cacheCardData[cacheKey]) {
      return cacheCardData[cacheKey]
    }

    if (selectedLanguage.value == MY_LANGUAGES_TAG.value) {
      const selectedTagsArticlesPromises = userSelectedTags.map((tag) => {
        if (tag.mediumValues) {
          if (cacheCardData[tag.label]) {
            return cacheCardData[tag.label]
          } else {
            return mediumApi.getArticles(tag.mediumValues[0])
          }
        }
        return []
      })

      data = await mergeMultipleDataSources(
        selectedTagsArticlesPromises,
        MAX_MERGED_ITEMS_PER_LANGUAGE
      )
    } else {
      data = await mediumApi.getArticles(selectedLanguage.mediumValues[0])
    }

    setCacheCardData({ ...cacheCardData, [cacheKey]: data })
    return data
  }

  function HeaderTitle() {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <span> Medium </span>
        <SelectableCard
          isLanguage={true}
          tagId={'MEDIUM_MENU_LANGUAGE_ID'}
          selectedTag={selectedLanguage}
          setSelectedTag={setSelectedLanguage}
          trackEvent={(tag) => trackCardLanguageChange('medium', tag.value)}
          fallbackTag={GLOBAL_TAG}
          cardSettings={cardsSettings?.medium?.language}
          data={userSelectedTags.map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
        />
      </div>
    )
  }

  const renderItem = (item, index) => (
    <ArticleItem item={item} key={`md-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      title={<HeaderTitle />}
      link="https://medium.com/">
      <ListComponent
        fetchData={fetchArticles}
        renderItem={renderItem}
        refresh={refresh}
        withAds={withAds}
      />
    </CardComponent>
  )
}

export default MediumCard
