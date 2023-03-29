import React, { useEffect, useRef } from 'react'
import { GoSearch } from 'react-icons/go'
import { SUPPORTED_SEARCH_ENGINES } from 'src/config'
import { trackSearchEngineUse } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { SearchEngine } from 'src/types'

type SearchBarProps = {
  withLogo?: boolean
}

export const SearchBar = ({ withLogo }: SearchBarProps) => {
  const { searchEngine } = useUserPreferences()

  const keywordsInputRef = useRef<HTMLInputElement | null>(null)
  const usedSearchEngine: SearchEngine =
    SUPPORTED_SEARCH_ENGINES.find((engine) => engine.label === searchEngine) ||
    SUPPORTED_SEARCH_ENGINES[0]

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
      <GoSearch className="searchBarIcon" size={20} />
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
