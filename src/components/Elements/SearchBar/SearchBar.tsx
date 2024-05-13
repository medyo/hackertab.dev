import React, { useEffect, useRef } from 'react'
import { IoSearchCircleSharp } from 'react-icons/io5'
import { trackSearchEngineUse } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

export const SearchBar = () => {
  const { searchEngine, searchEngines } = useUserPreferences()

  const keywordsInputRef = useRef<HTMLInputElement | null>(null)
  const usedSearchEngine =
    searchEngines.find((engine) => engine.label === searchEngine) || searchEngines[0]

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
      {usedSearchEngine.default === false ? (
        <IoSearchCircleSharp className="searchBarIcon" />
      ) : (
        <img
          className={'searchBarIcon'}
          src={`src/assets/${usedSearchEngine.label.toLowerCase()}_logo.svg`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null
            currentTarget.src = `src/assets/search_logo.svg`
          }}
        />
      )}
      <input
        ref={keywordsInputRef}
        type="text"
        name="keyword"
        className="searchBarInput"
        placeholder={`Search on ${usedSearchEngine.label}`}
      />
    </form>
  )
}
