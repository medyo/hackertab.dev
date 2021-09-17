import React, { useEffect, useState, useContext } from 'react'
import ReactTooltip from 'react-tooltip'
import { HiBell } from 'react-icons/hi'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import { format } from 'timeago.js'
import BeatLoader from 'react-spinners/BeatLoader'
import { APP } from '../Constants'
import PreferencesContext from '../preferences/PreferencesContext'

function Changelog({}) {
  const tooltipId = 'tl-1'
  const [changelogMarkdown, setChangelogMarkdown] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const localAppVersion = chrome?.runtime?.getManifest()?.version || '1.0'
  const preferences = useContext(PreferencesContext)
  const { dispatcher, changelogMeta } = preferences
  const [isChangelogRead, setIsChangelogRead] = useState(false)

  const afterShow = () => {
    dispatcher({ type: 'setChangelogMeta', value: { shown: true, version: localAppVersion } })
    if (changelogMarkdown.length === 0) {
      fetchChangelog()
    }
  }

  useEffect(() => {
    setIsChangelogRead(changelogMeta?.shown == true && changelogMeta?.version === localAppVersion)
  }, [changelogMeta])

  const fetchChangelog = async () => {
    setLoading(true)
    setError(null)
    setChangelogMarkdown([])

    try {
      const response = await axios.get(APP.changeLogLink)
      const data = response.data

      let sameLocalVersionIndex = data.findIndex(
        (item) => localAppVersion == item.name.replace(/[^\d.-]/g, '')
      )

      if (sameLocalVersionIndex == -1) {
        sameLocalVersionIndex = 0
      }

      const mappedVersions = data.slice(sameLocalVersionIndex, data.length).map((item) => {
        return {
          version: item.name,
          date: item.published_at,
          body: item.body,
          url: item.html_url,
        }
      })
      setChangelogMarkdown(mappedVersions)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ReactTooltip
        id={tooltipId}
        event="click"
        scrollHide={false}
        afterShow={afterShow}
        place="bottom"
        globalEventOff="click">
        {loading ? (
          <div className="tooltipLoading">
            <BeatLoader color={'#A9B2BD'} loading={loading} size={15} className="loading" />
          </div>
        ) : error ? (
          <p className="tooltipErrorMsg">Failed to load the changelog</p>
        ) : (
          changelogMarkdown.map((item) => {
            return (
              <>
                <div className="tooltipHeader" key={item.name}>
                  <a className="tooltipVersion" onClick={(e) => window.open(item.url, '_blank')}>
                    {item.version}
                  </a>
                  <span className="tooltipDate">{format(new Date(item.date))}</span>
                </div>
                <div className="tooltipContent">
                  <ReactMarkdown children={item.body} />
                </div>
              </>
            )
          })
        )}
      </ReactTooltip>
      <span
        data-tip
        data-for={tooltipId}
        className={'changelogButton' + (!isChangelogRead ? ' active' : '')}>
        <HiBell style={{ width: 14 }} />
      </span>
    </>
  )
}

export default Changelog
