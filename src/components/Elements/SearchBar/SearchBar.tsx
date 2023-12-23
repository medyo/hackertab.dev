import React, { useEffect, useRef } from 'react'
import { SUPPORTED_SEARCH_ENGINES } from 'src/config'
import { trackSearchEngineUse } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { SearchEngine } from 'src/types'

export const SearchBar = () => {
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
      <usedSearchEngine.logo className={'searchBarIcon ' + usedSearchEngine.className} />
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
