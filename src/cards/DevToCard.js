import React, { useContext, useState, useEffect } from 'react'
import devtoApi from '../services/devto'
import CardComponent from '../components/CardComponent'
import ListComponent from '../components/ListComponent'
import { format } from 'timeago.js'
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from '../components/CardLink'
import { BiCommentDetail } from 'react-icons/bi'
import { MdAccessTime } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
import CardItemWithActions from '../components/CardItemWithActions'
import ColoredLanguagesBadge from '../components/ColoredLanguagesBadge'
import SelectableCard from '../components/SelectableCard'
import { GLOBAL_TAG, MY_LANGUAGES_TAG, MAX_MERGED_ITEMS_PER_LANGUAGE } from '../Constants'
import { mergeMultipleDataSources } from '../utils/DataUtils'
import { trackCardLanguageChange } from '../utils/Analytics'

const DT_MENU_LANGUAGE_ID = 'DT_MENU_LANGUAGE_ID'

const ArticleItem = ({ item, index, analyticsTag }) => {
  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'devto'}
      index={index}
      key={index}
      item={item}
      cardItem={
        <>
          <CardLink link={item.url} analyticsSource={analyticsTag}>
            {listingMode === 'compact' && (
              <div className="counterWrapper">
                <AiOutlineLike />
                <span className="value">{item.public_reactions_count}</span>
              </div>
            )}
            <div className="subTitle">{item.title}</div>
          </CardLink>

          {listingMode === 'normal' && (
            <>
              <p className="rowDescription">
                <span className="rowItem">
                  <MdAccessTime className={'rowTitleIcon'} />
                  {format(new Date(item.published_at))}
                </span>
                <span className="rowItem">
                  <BiCommentDetail className={'rowTitleIcon'} />
                  {item.comments_count} comments
                </span>
                <span className="rowItem">
                  <AiOutlineLike className={'rowTitleIcon'} />
                  {item.public_reactions_count} reactions
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

function DevToCard({ analyticsTag, label, icon, withAds }) {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags, cardsSettings, dispatcher } = preferences
  const [refresh, setRefresh] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState()
  const [cacheCardData, setCacheCardData] = useState({})

  useEffect(() => {
    if (selectedLanguage) {
      trackCardLanguageChange('Devto', selectedLanguage.value)
      dispatcher({
        type: 'setCardSettings',
        value: { card: label.toLowerCase(), language: selectedLanguage.label },
      })
      setRefresh(!refresh)
    }
  }, [selectedLanguage])

  const fetchArticles = async () => {
    if (!selectedLanguage) {
      return []
    }

    if (!selectedLanguage.devtoValues) {
      throw Error(`Devto does not support ${selectedLanguage?.label}.`)
    }

    let data = []
    const cacheKey = `${selectedLanguage.label}`

    // Cache found
    if (cacheCardData[cacheKey]) {
      return cacheCardData[cacheKey]
    }

    if (selectedLanguage.value == MY_LANGUAGES_TAG.value) {
      const selectedTagsArticlesPromises = userSelectedTags.map((tag) => {
        if (tag.devtoValues) {
          if (cacheCardData[tag.label]) {
            return cacheCardData[tag.label]
          } else {
            return devtoApi.getArticlesByCount(tag.devtoValues[0], MAX_MERGED_ITEMS_PER_LANGUAGE)
          }
        }
        return []
      })

      data = await mergeMultipleDataSources(
        selectedTagsArticlesPromises,
        MAX_MERGED_ITEMS_PER_LANGUAGE
      )
    } else {
      data = await devtoApi.getArticles(selectedLanguage.devtoValues[0])
    }

    data = data.sort((a, b) => b.public_reactions_count - a.public_reactions_count)

    setCacheCardData({ ...cacheCardData, [cacheKey]: data })
    return data
  }

  const renderItem = (item, index) => (
    <ArticleItem item={item} key={`at-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  function HeaderTitle() {
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <span> DevTo </span>
        <SelectableCard
          isLanguage={true}
          tagId={DT_MENU_LANGUAGE_ID}
          selectedTag={selectedLanguage}
          setSelectedTag={setSelectedLanguage}
          fallbackTag={GLOBAL_TAG}
          cardSettings={cardsSettings?.devto?.language}
          data={userSelectedTags.map((tag) => ({
            label: tag.label,
            value: tag.value,
          }))}
        />
      </div>
    )
  }

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      title={<HeaderTitle />}
      link="https://dev.to/">
      <ListComponent
        fetchData={fetchArticles}
        renderItem={renderItem}
        refresh={refresh}
        withAds={withAds}
      />
    </CardComponent>
  )
}

export default DevToCard
