import { useState } from 'react'
import Select, { SingleValue } from 'react-select'

type PauseSettingsProps = {
  onSubmit: (pauseToValue: number) => void
}

type PauseOptionType = {
  value: number
  label: string
}

const customPauseOptions: PauseOptionType[] = [
  { value: 1, label: 'Minutes' },
  { value: 60, label: 'Hours' },
]

const PREDEFINED_OPTIONS: PauseOptionType[] = [
  { value: 15, label: '15 Minutes' },
  { value: 30, label: '30 Minutes' },
  { value: 60, label: '1 Hour' },
  { value: -1, label: 'Custom...' },
]

export const PauseSettings = ({ onSubmit }: PauseSettingsProps) => {
  const [pauseValue, setPauseValue] = useState(0)
  const [isCustomInput, setIsCustomInput] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<PauseOptionType>(customPauseOptions[0])
  const [error, setError] = useState<string | null>(null)

  const onSubmitClick = () => {
    setError(null)
    try {
      let value = pauseValue
      if (isCustomInput) {
        value = parseInt(selectedNumber) * selectedPeriod.value
      }
      if (isNaN(value) || value <= 0) {
        setError('Please select a valid value')
      } else {
        const futureDate = new Date(new Date().getTime() + value * 60000)

        onSubmit(futureDate.getTime())
      }
    } catch (err) {
      console.log('PauseSettings Error:', err)
      setError('An error occurred, please try agian')
    }
  }

  const onSearchEngineSelectChange = (selectedOption: SingleValue<PauseOptionType>) => {
    setError(null)
    if (!selectedOption) {
      return
    }
    if (selectedOption.value === -1) {
      setPauseValue(0)
      return setIsCustomInput(true)
    }
    setIsCustomInput(false)
    setPauseValue(selectedOption.value)
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">Focus Mode</p>
      <div className="settingContent">
        <div className="pauseFormWrapper">
          <div className="pauseChips">
            <Select
              options={PREDEFINED_OPTIONS}
              placeholder="Select a period..."
              isMulti={false}
              isClearable={false}
              isSearchable={false}
              classNamePrefix={'hackertab'}
              onChange={onSearchEngineSelectChange}
            />
          </div>
          {isCustomInput && (
            <div className="pauseForm">
              <input
                type="number"
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(e.target.value)}
                placeholder="Number"
              />
              <Select
                value={selectedPeriod}
                options={customPauseOptions}
                isClearable={false}
                isSearchable={false}
                classNamePrefix={'hackertab'}
                onChange={(newValue) => setSelectedPeriod(newValue as PauseOptionType)}
              />
            </div>
          )}
          {error && (
            <div className="settingHint">
              <p>{error}</p>
            </div>
          )}
          <div className="buttonWrapper">
            <button className="pauseButton" onClick={onSubmitClick}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
