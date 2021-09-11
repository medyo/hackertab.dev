
import React, { useEffect, useState, useContext } from 'react'
import { SiStackoverflow } from 'react-icons/si';
import { VscBriefcase } from 'react-icons/vsc';
import { MdAccessTime } from "react-icons/md"
import CardComponent from "../components/CardComponent";
import ListComponent from "../components/ListComponent";
import stackoverflowApi from '../services/stackoverflow';
import { format } from 'timeago.js';
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from "../components/CardLink"
import CardItemWithActions from '../components/CardItemWithActions'
import ColoredLanguagesBadge from "../components/ColoredLanguagesBadge"


const JobItem = ({ item, index, analyticsTag }) => {

  const { listingMode } = useContext(PreferencesContext)

  return (
    <CardItemWithActions
      source={'jobs'}
      index={index}
      key={index}
      item={{ ...item, url: item.link }}
      cardItem={(
        <>
          <CardLink link={item.link} analyticsSource={analyticsTag}>
            {item.title}
          </CardLink>
          { listingMode === "normal" ?
            <>
              <p className="rowDescription">
                <span className="rowItem"><MdAccessTime className={"rowTitleIcon"} />{format(item.date)}</span>
                <span className="rowItem"><VscBriefcase className={"rowTitleIcon"} />{item.location}</span>
              </p>

              <p className="rowDetails">
                <ColoredLanguagesBadge languages={item.categories} />
              </p>
            </> :
            <p className="rowDescription">
              <span className="rowItem"><VscBriefcase className={"rowTitleIcon"} />{item.location}</span>
            </p>
          }
        </>
      )}
    />
  )
}

function JobsCard({ analyticsTag, label, icon, withAds }) {
  const preferences = useContext(PreferencesContext)

  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  const fetchJobs = async () => {
    const promises = userSelectedTags.map((tag) => {
      if (tag['stackoverflowValues']) {
        return stackoverflowApi.getJobs(tag['stackoverflowValues'][0])
      }
      return []
    })
    const results = await Promise.allSettled(promises)

    return results
      .map((res, index) => {
        let value = res.value
        if (res.status === 'rejected') {
          value = []
        }
        return value.map((c) => ({
          ...c,
          tag: userSelectedTags[index],
          date: new Date(c.isoDate),
        }))
      })
      .flat()
      .sort((a, b) => b.date - a.date)
  }

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const renderItem = (item, index) => (
    <JobItem item={item} key={`jb-${index}`} index={index} analyticsTag={analyticsTag} />
  )

  return (
    <CardComponent
      icon={<span className="blockHeaderIcon">{icon}</span>}
      link="https://stackoverflow.com/jobs"
      title={label}>
      <ListComponent
        fetchData={fetchJobs}
        renderItem={renderItem}
        refresh={refresh}
        withAds={withAds}
      />
    </CardComponent>
  )
}

export default JobsCard