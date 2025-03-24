import { useState } from 'react'
import { isValidURL } from 'src/utils/UrlUtils'

import { TiPlus } from 'react-icons/ti'
import { Button } from 'src/components/Elements'
import { useUserPreferences } from 'src/stores/preferences'

export const AddSearchEngine = () => {
  const { addSearchEngine, searchEngines } = useUserPreferences()
  const [searchEngineUrl, setSearchEngineUrl] = useState<string | undefined>()
  const [RssInputFeedback, setRssInputFeedback] = useState<string | undefined>()

  const onAddSearchEngine = async () => {
    if (!searchEngineUrl) {
      setRssInputFeedback('Please provide a valid Search engine URL')
      return
    }

    if (!isValidURL(searchEngineUrl)) {
      setRssInputFeedback('Invalid Search Engine URL. Please check and try again')
      return
    }

    if (searchEngines.some((se) => se.url === searchEngineUrl)) {
      setRssInputFeedback('Search Engine already exists')
      return
    }

    // Get label from url
    const url = new URL(searchEngineUrl)
    const label = url.hostname.replace('www.', '').split('.')[0]

    addSearchEngine({ label: label, url: searchEngineUrl, default: false })
    setRssInputFeedback('Search Engine added successfully')
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">Search Engine URL</p>
      <div className="settingContent">
        <div className="form">
          <input
            type="text"
            value={searchEngineUrl || ''}
            onChange={(e) => setSearchEngineUrl(e.target.value)}
            placeholder="https://google.com?q="
          />
          <div>
            <Button startIcon={<TiPlus />} size="small" onClick={onAddSearchEngine}>
              Add
            </Button>
          </div>
        </div>
        {RssInputFeedback && (
          <div className="settingHint">
            <p>{RssInputFeedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}
