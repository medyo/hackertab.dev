import React, { useContext, useEffect, useState } from 'react'
import { HiTicket } from 'react-icons/hi';
import CardComponent from "../components/CardComponent";
import ListComponent from "../components/ListComponent";
import confstechApi from '../services/confstech'
import { MdAccessTime } from "react-icons/md"
import { flag } from 'country-emoji';
import { IoIosPin } from "react-icons/io"
import { RiCalendarEventFill } from "react-icons/ri";
import PreferencesContext from '../preferences/PreferencesContext'
import CardLink from "../components/CardLink";
import CardItemWithActions from '../components/CardItemWithActions'


const ConferenceItem = ({ conf, index }) => {
  const source = 'conferences';

  const formatConfsDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    return `${monthNames[date.getMonth()]} ${("0" + date.getDate()).slice(-2)}`

  }

  const ConferenceLocation = () => {
    return (
      conf.online ?
        "🌐 Online" :
        `${flag(conf.country.replace(/[^a-zA-Z ]/g, ""))} ${conf.city}`
    )
  }

  const ConferenceDate = () => {
    let value = ""
    if (conf.startDate) {
      value = `${formatConfsDate(conf.startDate)}`
    }
    if (conf.endDate && conf.endDate > conf.startDate) {
      value = `${value} - ${
        conf.endDate.getMonth() === conf.startDate.getMonth() ?
          ("0" + conf.endDate.getDate()).slice(-2)
          : formatConfsDate(conf.endDate)
        }`
    }
    return value
  }
  return (
    <CardItemWithActions
      source={source}
      index={index}
      item={{ ...conf, title: conf.name }}
      cardItem={(
        <>
          <CardLink link={conf.url} analyticsSource="events">
            <RiCalendarEventFill className={"rowTitleIcon"} />
            {conf.name}
          </CardLink>
          <div className="rowDescription">
            <span className="rowItem"><IoIosPin className="rowItemIcon" /> {ConferenceLocation()}</span>
            <span className="rowItem"><MdAccessTime className="rowItemIcon" /> {ConferenceDate()}</span>
          </div>
          <div className="rowDetails">
            <span className={"rowItem rowLanguage gh-language-" + conf.tag.value.toLowerCase()}>{conf.tag.value}</span>
          </div>
        </>
      )}
    />
  )
}


function ConferencesCard() {
  const preferences = useContext(PreferencesContext)
  const { userSelectedTags = [] } = preferences
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    setRefresh(!refresh)
  }, [userSelectedTags])

  const fetchConfs = async () => {
    const promises = userSelectedTags.map(tag => {
      if (tag.confsValues) {
        return confstechApi.getTagConfs(tag.confsValues[0])
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
        ...c, tag: userSelectedTags[index], startDate: new Date(c.startDate), endDate: new Date(c.endDate)
      }))
    }).flat().sort((a, b) => a.startDate - b.startDate).filter(c => c.startDate >= new Date())

  }

  const renderConfs = (confs) => {
    return confs.map((conf, index) => <ConferenceItem conf={conf} index={index} />)
  }
  return (
    <CardComponent
      icon={<HiTicket className="blockHeaderIcon" color="#4EC8AF" />}
      title={"Upcoming events"}
    >
      <ListComponent
        fetchData={fetchConfs}
        renderData={renderConfs}
        refresh={refresh}
      />
    </CardComponent>
  )
}

export default ConferencesCard