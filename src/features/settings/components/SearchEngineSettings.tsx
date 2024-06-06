import { IoSearchCircleSharp } from 'react-icons/io5'
import { ChipsSet } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { identifyUserSearchEngine, trackSearchEngineSelect } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { AddSearchEngine } from './AddSearchEngine'

export const SearchEngineSettings = () => {
  const { searchEngine, searchEngines, removeSearchEngine, setSearchEngine } = useUserPreferences()

  return (
    <SettingsContentLayout
      title="Search Engine"
      description={`
      Choose your favorite search engine to use in the search bar. 
      You can also add a new search engine by providing the search engine URL.
    `}>
      <>
        <ChipsSet
          canSelectMultiple={false}
          options={searchEngines.map((engine) => {
            return {
              label: engine.label,
              value: engine.url,
              removeable: engine.default === false,
              icon:
                engine.default === false ? (
                  <IoSearchCircleSharp />
                ) : (
                  <img
                    className="lang_icon"
                    src={`/searchengine_logos/${engine.label.toLowerCase()}_logo.svg`}
                  />
                ),
            }
          })}
          defaultValues={[searchEngines.find((se) => se.label === searchEngine)?.url || '']}
          onRemove={(option) => {
            removeSearchEngine(option.value)
          }}
          onChange={(changes) => {
            const value = changes.option

            identifyUserSearchEngine(value.label)
            trackSearchEngineSelect(value.label)
            setSearchEngine(value.label)
          }}
        />
        <hr />
        <>
          <header>
            <div className="settingsHeader">
              <h3 className="title">Add new Search Engine</h3>
              <p className="description">
                Can't find your favorite search engine? Add it here and it.
              </p>
            </div>
          </header>
          <AddSearchEngine />
        </>
      </>
    </SettingsContentLayout>
  )
}
