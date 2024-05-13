import { IoIosSearch } from 'react-icons/io'
import { useUserPreferences } from 'src/stores/preferences'
import { SearchBar } from '../SearchBar/SearchBar'
import './SearchBarWithLogo.css'

export const SearchBarWithLogo = () => {
  const { searchEngine, searchEngines } = useUserPreferences()
  const userSearchEngine =
    searchEngines.find(
      (srchEngn) => srchEngn.label.toLocaleLowerCase() === searchEngine.toLocaleLowerCase()
    ) || searchEngines[0]

  return (
    <div className="searchBarWithLogo">
      {userSearchEngine.default === false ? (
        <div className="searchEngineLogo">
          <IoIosSearch />
        </div>
      ) : (
        <img
          className={'searchEngineLogo ' + userSearchEngine.className}
          src={`src/assets/${userSearchEngine.label.toLowerCase()}_logo.svg`}
        />
      )}

      <SearchBar />
    </div>
  )
}
