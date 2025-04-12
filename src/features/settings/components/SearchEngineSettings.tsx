import { HiSparkles } from 'react-icons/hi'
import { ChipsSet } from 'src/components/Elements'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout/SettingsContentLayout'
import { AI_PROMPT_ENGINES } from 'src/config/SearchEngines'
import { identifyUserSearchEngine, trackSearchEngineSelect } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { AddSearchEngine } from './AddSearchEngine'

export const SearchEngineSettings = () => {
  const { promptEngines, promptEngine, removeSearchEngine, setPromptEngine } = useUserPreferences()
  const mergedSearchEngines = [...AI_PROMPT_ENGINES, ...promptEngines]

  return (
    <SettingsContentLayout
      title="AI Prompt Engine"
      description={`
     Select from top AI models, input your prompt, and get quick responses. 
      You can also add a new ai model engine by providing the right URL.
    `}>
      <>
        <ChipsSet
          canSelectMultiple={false}
          options={mergedSearchEngines.map((engine) => {
            return {
              label: engine.label,
              value: engine.url,
              removeable: engine.default === false,
              icon:
                engine?.default === false ? (
                  <HiSparkles />
                ) : (
                  <img
                    className="lang_icon"
                    src={`/searchengine_logos/${engine.label.toLowerCase()}_logo.svg`}
                  />
                ),
            }
          })}
          defaultValues={[mergedSearchEngines.find((se) => se.label === promptEngine)?.url || '']}
          onRemove={(option) => {
            removeSearchEngine(option.value)
          }}
          onChange={(changes) => {
            const value = changes.option

            identifyUserSearchEngine(value.label)
            trackSearchEngineSelect(value.label)
            setPromptEngine(value.label)
          }}
        />
        <hr />
        <>
          <header>
            <div className="settingsHeader">
              <h3 className="title">Add new AI prompt Engine</h3>
              <p className="description">
                Can't find your favorite AI prompt engine? Add it here and it.
              </p>
            </div>
          </header>
          <AddSearchEngine />
        </>
      </>
    </SettingsContentLayout>
  )
}
