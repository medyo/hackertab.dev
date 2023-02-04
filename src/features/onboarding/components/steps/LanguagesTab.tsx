import { ChipsSet, StepProps } from 'src/components/Elements'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { Occupation } from '../../types'

export const LanguagesTab = ({
  moveToPrevious,
  moveToNext,
  setTabsData,
  tabsData,
}: StepProps<Occupation>) => {
  const { supportedTags } = useRemoteConfigStore()

  const sources = supportedTags
    .map((tag) => {
      return {
        label: tag.label,
        value: tag.value,
      }
    })
    .sort((a, b) => (a.label > b.label ? 1 : -1))

  return (
    <div>
      <div className="tabHeader">
        <h1 className="tabTitle">🦾 Select your languages & topics</h1>
        <p className="tabBody">Select the languages you're interested in following.</p>
      </div>
      <div className="tabContent sources">
        <ChipsSet
          canSelectMultiple={true}
          options={sources}
          defaultValues={tabsData.tags}
          onChange={(_, selectedChips) => {
            setTabsData({ ...tabsData, tags: selectedChips.map((chip) => chip.value) })
          }}
        />
      </div>
      <div className="tabFooter">
        <button onClick={() => moveToPrevious && moveToPrevious()}>Back</button>
        <button className="positiveButton" onClick={() => moveToNext && moveToNext()}>
          Finish
        </button>
      </div>
    </div>
  )
}
