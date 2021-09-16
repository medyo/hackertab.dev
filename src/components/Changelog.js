import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { HiBell } from 'react-icons/hi'
import ReactMarkdown from 'react-markdown'

function Changelog({}) {
  const [changelogMarkdown, setChangelogMarkdown] = useState('#### Features\n-Add x\n\n-Add y')
  const tooltipId = 'tl-1'

  useEffect(() => {
    ReactTooltip.rebuild()
  })

  return (
    <>
      <ReactTooltip id={tooltipId} event="click" place="bottom">
        <ReactMarkdown children={changelogMarkdown} />
      </ReactTooltip>
      <span data-tip data-for={tooltipId} className="changelogButton">
        <HiBell style={{ width: 14 }} />
      </span>
    </>
  )
}

export default Changelog
