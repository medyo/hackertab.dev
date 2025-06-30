import { BsArrowRight } from 'react-icons/bs'
import { Button, ChipsSet, StepProps } from 'src/components/Elements'
import { SUPPORTED_CARDS } from '../../../../config/supportedCards'
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
            setTabsData({ ...tabsData, sources: selectedChips.map((chip) => chip.value) })
          }}
        />
      </div>
      <div className="mt-8 flex flex-row justify-end gap-2 align-middle">
        <Button onClick={() => moveToPrevious && moveToPrevious()}>Back</Button>
        <Button
          type="primary"
          endIcon={<BsArrowRight />}
          onClick={() => moveToNext && moveToNext()}>
          Next
        </Button>
      </div>
    </div>
  )
}
