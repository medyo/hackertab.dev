import React, { useEffect, useState }  from 'react'
import ReactTooltip from 'react-tooltip'
import { HiBell } from 'react-icons/hi'
import ReactMarkdown from 'react-markdown'
import { format } from 'timeago.js'
import BeatLoader from 'react-spinners/BeatLoader'
import {useGetVersions} from "../api/getVersions";
import {useChangelogStore} from "../stores/changelog";
import {getAppVersion} from "src/utils/Os";

export const Changelog = ()  => {
  const tooltipId = 'tl-1'
  const [tooltipOpen, setTooltipShown] = useState(false);
  const {isLoading, isError, data: versions} = useGetVersions({
    config: {
      enabled: tooltipOpen
    }
  });

  const {lastReadVersion, setVersionAsRead} = useChangelogStore();

  const isChangelogRead = (): boolean => {
    return lastReadVersion === getAppVersion();
  }

  useEffect(() => {
    if (tooltipOpen) {
      setVersionAsRead(getAppVersion())
    }
  }, [tooltipOpen, setVersionAsRead])

  return (
    <>
      <ReactTooltip
        id={tooltipId}
        event="click"
        scrollHide={false}
        afterShow={() => {setTooltipShown(true)}}
        place="bottom"
        className="changelogTooltip scrollable"
        globalEventOff="click">
        {isLoading ? (
          <div className="tooltipLoading">
            <BeatLoader color={'#A9B2BD'} loading={isLoading} size={15} />
          </div>
        ) : isError || !versions.length ? (
          <p className="tooltipErrorMsg">Failed to load the changelog</p>
        ) : (
          versions.map((item) => {
            return (
              <div key={item.name}>
                <div className="tooltipHeader">
                  <a className="tooltipVersion" onClick={() => window.open(item.html_url, '_blank')}>
                    {item.name}
                  </a>
                  <span className="tooltipDate">{format(new Date(item.published_at))}</span>
                </div>
                <div className="tooltipContent">
                  <ReactMarkdown children={item.body} />
                </div>
              </div>
            )
          })
        )}
      </ReactTooltip>
      <span
        data-tip
        data-for={tooltipId}
        className={'changelogButton' + (!isChangelogRead() ? ' active' : '')}>
        <HiBell style={{ width: 14 }} />
      </span>
    </>
  )
}