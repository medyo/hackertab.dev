import { BsArrowRight } from 'react-icons/bs'
import { ChipsSet, StepProps } from 'src/components/Elements'
import { SUPPORTED_CARDS } from '../../../../config'
import { Occupation } from '../../types'

export const SourcesTab = ({ moveToPrevious, moveToNext, tabsData }: StepProps<Occupation>) => {
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
        <p className="tabBody">Select the sources you're interested in following.</p>
      </div>
      <div className="tabContent sources">
        <ChipsSet options={sources} defaultValues={tabsData.sources} />
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
