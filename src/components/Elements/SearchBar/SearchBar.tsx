import React, { useEffect, useRef } from 'react'
import { HiSparkles } from 'react-icons/hi'
import { AI_PROMPT_ENGINES } from 'src/config/SearchEngines'
import { trackSearchEngineUse } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

export const SearchBar = () => {
  const { promptEngine, promptEngines } = useUserPreferences()
  const mergedEngines = [...AI_PROMPT_ENGINES, ...promptEngines]

  const keywordsInputRef = useRef<HTMLInputElement | null>(null)
  const usedSearchEngine =
    mergedEngines.find((engine) => engine.label.toLowerCase() === promptEngine.toLowerCase()) ||
    promptEngines[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      keyword: { value: string }
    }

    trackSearchEngineUse(usedSearchEngine.label)
    window.open(`${usedSearchEngine.url}${target.keyword.value}`, '_self')
  }

  useEffect(() => {
    keywordsInputRef.current?.focus()
  }, [])

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      {usedSearchEngine?.default === false ? (
        <HiSparkles className="searchBarIcon" />
      ) : (
        <img
          className={'searchBarIcon'}
          src={`/searchengine_logos/${usedSearchEngine.label.toLowerCase()}_logo.svg`}
        />
      )}
      <input
        ref={keywordsInputRef}
        type="text"
        name="keyword"
        className="searchBarInput"
        placeholder={`Ask ${usedSearchEngine.label}`}
      />
    </form>
  )
}
