import { SUPPORTED_SEARCH_ENGINES } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { SearchBar } from '../SearchBar/SearchBar'
import './SearchBarWithLogo.css'

export const SearchBarWithLogo = () => {
  const { searchEngine } = useUserPreferences()
  const userSearchEngine = SUPPORTED_SEARCH_ENGINES.find(
    (srchEngn) => srchEngn.label.toLocaleLowerCase() === searchEngine.toLocaleLowerCase()
  )

  return (
    <div className="searchBarWithLogo">
      {userSearchEngine?.logo && (
        <div className="searchEngineLogo">
          <userSearchEngine.logo className={userSearchEngine?.className} />
        </div>
      )}
      <SearchBar />
    </div>
  )
}
