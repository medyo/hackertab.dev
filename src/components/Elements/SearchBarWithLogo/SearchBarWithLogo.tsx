import { HiSparkles } from 'react-icons/hi'
import { AI_PROMPT_ENGINES } from 'src/config/SearchEngines'
import { useUserPreferences } from 'src/stores/preferences'
import { SearchEngineBar } from '../SearchBar/SearchEngineBar'
import './SearchBarWithLogo.css'

export const SearchBarWithLogo = () => {
  const { promptEngine, promptEngines } = useUserPreferences()
  const mergedSearchEngines = [...AI_PROMPT_ENGINES, ...promptEngines]
  const userSearchEngine =
    mergedSearchEngines.find(
      (srchEngn) => srchEngn.label.toLocaleLowerCase() === promptEngine.toLocaleLowerCase()
    ) || mergedSearchEngines[0]

  return (
    <div className="searchBarWithLogo">
      {userSearchEngine.default === false ? (
        <div className="searchEngineLogo">
          <HiSparkles />
        </div>
      ) : (
        <img
          className={'searchEngineLogo ' + userSearchEngine.className}
          src={`/searchengine_logos/${userSearchEngine.label.toLowerCase()}_logo.svg`}
        />
      )}

      <SearchEngineBar />
    </div>
  )
}
