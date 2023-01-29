import { BsArrowRight } from 'react-icons/bs'
import { ChipsSet, StepProps } from 'src/components/Elements'
import { SUPPORTED_CARDS } from '../../../../config'
import { Occupation } from '../../types'

export const SourcesTab = ({
  moveToPrevious,
  moveToNext,
  setTabsData,
  tabsData,
}: StepProps<Occupation>) => {
  const sources = SUPPORTED_CARDS.map((source) => {
    return {
      label: source.label,
      value: source.value,
      icon: source.icon,
    }
  }).sort((a, b) => (a.label > b.label ? 1 : -1))

  return (
    <div>
      <div className="tabHeader">
        <h1 className="tabTitle">📙 Pick your sources</h1>
        <p className="tabBody">Your feed will be tailored by your followed sources</p>
      </div>
      <div className="tabContent sources">
        <ChipsSet
          canSelectMultiple={true}
          options={sources}
          defaultValues={tabsData.sources}
          onChange={(_, selectedChips) => {
            console.log(
              'sources',
              selectedChips.map((chip) => chip.value)
            )

            setTabsData({ ...tabsData, sources: selectedChips.map((chip) => chip.value) })
          }}
        />
      </div>
      <div className="tabFooter">
        <button onClick={() => moveToPrevious && moveToPrevious()}>Back</button>
        <button className="positiveButton" onClick={() => moveToNext && moveToNext()}>
          <BsArrowRight /> Next
        </button>
      </div>
    </div>
  )
}
