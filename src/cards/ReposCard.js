import React, { useState, useEffect, useContext } from 'react'
import CardComponent from "../components/CardComponent";
import ListComponent from "../components/ListComponent";
import { SiGithub } from 'react-icons/si';
import { VscRepo, VscRepoForked, VscStarFull } from 'react-icons/vsc';
import githubApi from '../services/github'
import { RiArrowDownSFill } from 'react-icons/ri';
import {
  Menu,
  Item,
  animation,
  useContextMenu
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from "../components/CardLink";
import CardItemWithActions from '../components/CardItemWithActions'
import { trackReposLanguageChange, trackReposDateRangeChange } from "../utils/Analytics"
import ColoredLanguagesBadge from "../components/ColoredLanguagesBadge"


const RepoItem = ({ item, index }) => {

  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'github'}
      key={index}
      index={index}
      item={{...item, title: `${item.owner ? item.owner + "/" : ""}${item.name}`}}
      cardItem={(
        <>
          <CardLink className="githubTitle" link={item.url} analyticsSource="repos">
            <VscRepo className={"rowTitleIcon"} />
            {
              item.owner && `${item?.owner}/`
            }
            <b>{item.name}</b>
          </CardLink>
          <p className="rowDescription">{item.description}</p>
          { listingMode === "normal" && 
            <div className="rowDetails">
              <ColoredLanguagesBadge languages={[item.programmingLanguage]} />
              {
                item.stars &&
                <span className="rowItem"><VscStarFull className="rowItemIcon" /> {item.stars} stars</span>
              }
              {
                item.forks &&
                <span className="rowItem"><VscRepoForked className="rowItemIcon" /> {item.forks} forks</span>
              }
            </div>
          }
        </>
      )}
    />
  )
}


const TAGS_MENU_ID = "tags-menu";
const DATE_RANGE_MENU_ID = "date-range-id"

function ReposCard({ analyticsTag, icon, withAds }) {

  const getInitialSelectedTag = () => {
    const githubCardSettings = cardsSettings && cardsSettings.repos ? cardsSettings.repos : null
    if (githubCardSettings && githubCardSettings.language) {
      return getTags().find((t) => t.label == githubCardSettings.language)
    }

    return getTags().find((t) => t.githubValues != null)
  }

  const getInitialDateRange = () => {
    const githubCardSettings = cardsSettings && cardsSettings.repos ? cardsSettings.repos : null
    console.log(githubCardSettings)
    if (githubCardSettings && githubCardSettings.dateRange) {
      return githubCardSettings.dateRange
    }
    return 'daily'
  }

  const globalTag = { value: 'global', label: 'All trending', githubValues: ['global'] }
  const myLangsTag = { value: 'myLangs', label: 'My Languages', githubValues: ['myLangs'] }

  const preferences = useContext(PreferencesContext)

  const { userSelectedTags = [], dispatcher, cardsSettings } = preferences

  const getTags = () => [...userSelectedTags, globalTag, myLangsTag]

  const { show: showMenu } = useContextMenu()

  const [selectedTag, setSelectedTag] = useState(getInitialSelectedTag())
  const [since, setSince] = useState(getInitialDateRange())
  const [refresh, setRefresh] = useState(true)
  const [repos, setRepos] = useState({})
  const dateRangeMapper = {
    daily: 'the day',
    weekly: 'the week',
    monthly: 'the month',
  }

  useEffect(() => {
    setSelectedTag(getInitialSelectedTag())
    setRepos({})
    setRefresh(!refresh)
  }, [userSelectedTags])

  const onSelectedTagChange = (selTag) => {
    setSelectedTag(selTag)
    trackReposLanguageChange(selTag.value)
    dispatcher({ type: 'setCardSettings', value: { card: 'repos', language: selTag.label } })
    setRefresh(!refresh)
  }

  const onDateRangeChange = (dateRange) => {
    setSince(dateRange)
    dispatcher({ type: 'setCardSettings', value: { card: 'repos', dateRange } })
    trackReposDateRangeChange(dateRange)
    setRefresh(!refresh)
  }

  const displayMenu = (e) => {
    const {
      target: {
        dataset: { targetId },
      },
    } = e
    if (targetId) {
      showMenu(e, { id: targetId })
    }
  }

  const fetchRepos = async () => {
    if (!selectedTag.githubValues) {
      throw Error(`Github Trending does not support ${selectedTag.label}.`)
    }

    const tagValue = selectedTag.githubValues[0]
    const key = `${tagValue}-${since}` 

    if (repos[key]) {
      return repos[key]
    }

    if (tagValue == myLangsTag.githubValues[0]) {
      const promises = userSelectedTags.map(
        t => !t.githubValues ? false : githubApi.getTrending(t.githubValues[0], since)
      )
      let values = await Promise.all(promises)
      const nbrTags = values.length
      let minLength = 25

      const data = []
      for (let index = 0; index < minLength; index++) {
        for (let i = 0; i < nbrTags; i++) {
          data.push(values[i][index])
        }
      }

      setRepos({ ...repos, [key]: data })
      return data
      
    }

    const data = await githubApi.getTrending(tagValue, since)
    setRepos({ ...repos, [key]: data })
    return data
  }

  function HeaderTitle() {
    if (!selectedTag) {
      return null
    }
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }}>
        <span onClick={displayMenu} className="headerSelect" data-target-id={TAGS_MENU_ID}>
          {selectedTag.label}
          <RiArrowDownSFill className="headerSelectIcon" />
        </span>
        <span> Repos of </span>
        <span onClick={displayMenu} className="headerSelect" data-target-id={DATE_RANGE_MENU_ID}>
          {dateRangeMapper[since]}
          <RiArrowDownSFill className="headerSelectIcon" />
        </span>
      </div>
    )
  }

  const renderItem = (item, index) => (
    <RepoItem item={item} key={`rp-${index}`} analyticsTag={analyticsTag} />
  )

  return (
    <>
      <CardComponent
        fullBlock={true}
        icon={<span className="blockHeaderIcon">{icon}</span>}
        title={<HeaderTitle />}>
        <ListComponent
          fetchData={fetchRepos}
          renderItem={renderItem}
          refresh={refresh}
          withAds={withAds}
        />
        <Menu id={TAGS_MENU_ID} animation={animation.fade}>
          {getTags().map((tag) => {
            return (
              <Item key={tag.value} onClick={() => onSelectedTagChange(tag)}>
                {tag.label}
              </Item>
            )
          })}
        </Menu>
        <Menu id={DATE_RANGE_MENU_ID} animation={animation.fade}>
          {Object.keys(dateRangeMapper).map((key) => {
            return (
              <Item key={key} onClick={() => onDateRangeChange(key)}>
                {dateRangeMapper[key]}
              </Item>
            )
          })}
        </Menu>
      </CardComponent>
    </>
  )
}

export default ReposCard;