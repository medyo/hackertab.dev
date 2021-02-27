import React, { useState, useEffect, useContext } from 'react'
import CardComponent from "./CardComponent";
import ListComponent from "./ListComponent";
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
import PreferencesContext from '../preference/PreferencesContext'
import CardLink from "./CardLink";
import CardItemWithActions from '../components/CardItemWithActions'


const RepoItem = ({ item, index }) => {
  const source = 'github'
  return (
    <CardItemWithActions
      source={source}
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
          <div className="rowDetails">
            {
              item.programmingLanguage && <span className={"rowItem rowLanguage gh-language-" + item.programmingLanguage.toLowerCase()}>{item.programmingLanguage}</span>
            }
            {
              item.stars &&
              <span className="rowItem"><VscStarFull className="rowItemIcon" /> {item.stars} stars</span>
            }
            {
              item.forks &&
              <span className="rowItem"><VscRepoForked className="rowItemIcon" /> {item.forks} forks</span>
            }
          </div>
        </>
      )}
    />
  )
}


const MENU_ID = "menu-id";

function ReposCard() {

  const globalTag = { value: 'global', label: 'All trending', githubValues: ['global'] }

  const preferences = useContext(PreferencesContext)

  const { userSelectedTags = [], userBookmarks = [] } = preferences

  const getTags = () => [...userSelectedTags, globalTag]

  const { show } = useContextMenu({
    id: MENU_ID
  });

  const [selectedTag, setSelectedTag] = useState(getTags()[0])
  const [since, setSince] = useState('daily')
  const [refresh, setRefresh] = useState(true)
  const dateRangeMapper = {
    'daily': 'the day',
    'weekly': 'the week',
    'monthly': 'the month'
  }

  useEffect(() => {
    setSelectedTag(getTags()[0])
  }, [])

  useEffect(() => {
    setSelectedTag(getTags()[0])
    setRefresh(!refresh)
  }, [userSelectedTags])

  const onSelectedTagChange = (selTag) => {
    setSelectedTag(selTag)
    setRefresh(!refresh)
  }


  const fetchRepos = async () => {
    if (!selectedTag.githubValues) {
      throw Error(`Github Trending does not support ${selectedTag.label}.`)
    }
    const data = await githubApi.getTrending(selectedTag.githubValues[0], since)
    return data
  }

  function HeaderTitle() {
    if (!selectedTag) { return null }
    return (
      <div style={{ display: 'inline-block', margin: 0, padding: 0 }} >
        <span onClick={show} className="headerSelect">{selectedTag.label}<RiArrowDownSFill className="headerSelectIcon" /></span>
        <span> Repos of {dateRangeMapper[since]}</span>
      </div>
    )
  }

  const renderRepos = (repos) => {
    return repos.map((item, index) =>
      <RepoItem item={item} index={index} />
    )
  }


  return (
    <>
      <CardComponent
        fullBlock={true}
        icon={<SiGithub className="blockHeaderIcon blockHeaderWhite" />}
        title={<HeaderTitle />}
      >
        <ListComponent
          fetchData={fetchRepos}
          renderData={renderRepos}
          refresh={refresh}
        />
        <Menu id={MENU_ID}
          animation={animation.fade}>
          {
            getTags().map((tag) => {
              return (<Item key={tag} onClick={(e) => onSelectedTagChange(tag)}>
                {tag.label}
              </Item>)
            })
          }
        </Menu>
      </CardComponent>

    </>

  )
}

export default ReposCard;