
import React, { useEffect, useState, useContext } from 'react'
import { SiStackoverflow } from 'react-icons/si';
import { VscBriefcase } from 'react-icons/vsc';
import { MdAccessTime } from "react-icons/md"
import CardComponent from "./CardComponent";
import ListComponent from "./ListComponent";
import stackoverflowApi from '../services/stackoverflow';
import { format } from 'timeago.js';
import PreferencesContext from '../contexts/PreferencesContext'
import CardLink from "./CardLink"
import CardItemWithBookmark from '../CardItemWithBookmark'


const JobItem = ({ item, index }) => {
  const source = 'jobs'
  return (
    <CardItemWithBookmark
      source={source}
      index={index}
      item={{ ...item, url: item.link }}
      cardItem={(
        <>
          <CardLink link={item.link} analyticsSource="jobs">
            {item.title}
          </CardLink>
          <p className="rowDescription">
            <span className="rowItem"><MdAccessTime className={"rowTitleIcon"} />{format(item.date)}</span>
            <span className="rowItem"><VscBriefcase className={"rowTitleIcon"} />{item.location}</span>
          </p>

          <p className="rowDetails">
            {item.categories.map((cat, index) =>
              <span key={index} className={"rowItem rowLanguage gh-language-" + cat.toLowerCase()}>{cat}</span>

            )
            }
          </p>
        </>
      )}
    />
  )
}

function JobsCard() {
  const preferences = useContext(PreferencesContext)

  const { userSelectedTags } = preferences

  const [refresh, setRefresh] = useState(true)

  const fetchJobs = async () => {
    const promises = userSelectedTags.map(tag => {
      if (tag['stackoverflowValues']) {
        return stackoverflowApi.getJobs(tag['stackoverflowValues'][0])
      }
      return []
    })
    const results = await Promise.allSettled(promises)

    return results.map((res, index) => {
      let value = res.value
      if (res.status === 'rejected') {
        value = []
      }
      return value.map(c => ({
        ...c, tag: userSelectedTags[index], date: new Date(c.isoDate)
      }))
    }).flat().sort((a, b) => b.date - a.date)
  }


  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const renderJobs = (jobs) => {
    return jobs.map((item, index) => <JobItem item={item} index={index} />)
  }
  return (
    <CardComponent
      icon={<SiStackoverflow className="blockHeaderIcon" color="#F18032" />}
      title={"Featured Jobs"}
    >

      <ListComponent
        fetchData={fetchJobs}
        renderData={renderJobs}
        refresh={refresh}
      />
    </CardComponent>
  )
}

export default JobsCard