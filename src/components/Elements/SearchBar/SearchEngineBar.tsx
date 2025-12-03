import { HiSparkles } from 'react-icons/hi'
import { AI_PROMPT_ENGINES } from 'src/config/SearchEngines'
import { trackSearchEngineUse } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { SearchBar } from './SearchBar'

export const SearchEngineBar = () => {
  const { promptEngine, promptEngines } = useUserPreferences()
  const mergedEngines = [...AI_PROMPT_ENGINES, ...promptEngines]

  const usedSearchEngine =
    mergedEngines.find((engine) => engine.label.toLowerCase() === promptEngine.toLowerCase()) ||
    promptEngines[0]

  return (
    <SearchBar
      iconStart={
        usedSearchEngine.default === false ? (
          <HiSparkles className="searchBarIcon" />
        ) : (
          <img
            className={'searchBarIcon'}
            src={`/searchengine_logos/${usedSearchEngine.label.toLowerCase()}_logo.svg`}
          />
        )
      }
      onSubmit={(keyword) => {
        trackSearchEngineUse(usedSearchEngine.label)
        window.open(`${usedSearchEngine.url}${keyword}`, '_self')
      }}
      placeholder={`Ask ${usedSearchEngine.label}`}
    />
  )
}
