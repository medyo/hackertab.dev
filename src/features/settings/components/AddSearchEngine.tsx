import { useState } from 'react'
import { isValidURL } from 'src/utils/UrlUtils'

import { TiPlus } from 'react-icons/ti'
import { Button } from 'src/components/Elements'
import { AI_PROMPT_ENGINES } from 'src/config/SearchEngines'
import { useUserPreferences } from 'src/stores/preferences'

export const AddSearchEngine = () => {
  const { addSearchEngine, promptEngines } = useUserPreferences()
  const [searchEngineUrl, setSearchEngineUrl] = useState<string | undefined>()
  const [inputFeedback, setInputFeedback] = useState<string | undefined>()
  const mergedEngines = [...AI_PROMPT_ENGINES, ...promptEngines]

  const onAddSearchEngine = async () => {
    if (!searchEngineUrl) {
      setInputFeedback('Please provide a valid Prompt engine URL')
      return
    }

    if (!isValidURL(searchEngineUrl)) {
      setInputFeedback('Invalid AI prompt Engine URL. Please check and try again')
      return
    }

    if (mergedEngines.some((se) => se.url === searchEngineUrl)) {
      setInputFeedback('AI Prompt Engine already exists')
      return
    }

    // Get label from url
    const url = new URL(searchEngineUrl)
    const label = url.hostname.replace('www.', '').split('.')[0]

    addSearchEngine({ label: label, url: searchEngineUrl, default: false })
    setInputFeedback('AI Prompt Engine added successfully')
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">AI prompt Engine URL</p>
      <div className="settingContent">
        <div className="form">
          <input
            type="text"
            value={searchEngineUrl || ''}
            onChange={(e) => setSearchEngineUrl(e.target.value)}
            placeholder="https://chatgpt.com?q="
          />
          <div>
            <Button startIcon={<TiPlus />} size="small" onClick={onAddSearchEngine}>
              Add
            </Button>
          </div>
        </div>
        {inputFeedback && (
          <div className="settingHint">
            <p>{inputFeedback}</p>
          </div>
        )}
      </div>
    </div>
  )
}
