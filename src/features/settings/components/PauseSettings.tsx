import { useState } from 'react'
import Select from 'react-select'
import Toggle from 'react-toggle'
import { ChipsSet } from 'src/components/Elements'

type PauseSettingsProps = {
  onSubmit: (pauseToValue: number) => void
}

type PauseOptionType = {
  value: number
  label: string
}

const pauseOptions: PauseOptionType[] = [
  { value: 1, label: 'Minutes' },
  { value: 60, label: 'Hours' },
  { value: 1440, label: 'Days' },
]

export const PauseSettings = ({ onSubmit }: PauseSettingsProps) => {
  const [isPauseChecked, setIsPauseChecked] = useState(false)
  const [pauseValue, setPauseValue] = useState(0)
  const [isCustomInput, setIsCustomInput] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<PauseOptionType>(pauseOptions[0])

  const onPauseAppChange = () => {
    setIsPauseChecked(!isPauseChecked)
  }
  const onSubmitClick = () => {
    try {
      let value = pauseValue
      if (isCustomInput) {
        value = parseInt(selectedNumber) * selectedPeriod.value
      }
      if (value <= 0) {
        throw Error('Invalid value')
      }
      const futureDate = new Date(new Date().getTime() + pauseValue * 60000)
      onSubmit(futureDate.getTime())
    } catch (err) {
      console.log('PauseSettings Error:', err)
    }
  }

  const onChipsChange = (selectedChip) => {
    let value = parseInt(selectedChip.value)
    if (value === -1) {
      setPauseValue(0)
      return setIsCustomInput(true)
    }
    setIsCustomInput(false)
    setPauseValue(value)
  }
  return (
    <div className="settingRow">
      <p className="settingTitle">Pause App</p>
      <div className="settingContent">
        <Toggle checked={isPauseChecked} icons={false} onChange={onPauseAppChange} />

        {isPauseChecked && (
          <div className="pauseFormWrapper">
            <div className="pauseChips">
              <ChipsSet
                className={'noMargin alternative-color'}
                canSelectMultiple={false}
                options={[
                  {
                    label: '30 Minutes',
                    value: '30',
                  },
                  {
                    label: '1 Hour',
                    value: '60',
                  },
                  {
                    label: '1 Day',
                    value: '1440',
                  },
                  {
                    label: 'Custom',
                    value: '-1',
                  },
                ]}
                defaultValues={['60']}
                onChange={(_, selectedChips) => {
                  onChipsChange(selectedChips[0])
                }}
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
                  options={pauseOptions}
                  isClearable={false}
                  isSearchable={false}
                  classNamePrefix={'hackertab'}
                  onChange={(newValue) => setSelectedPeriod(newValue as PauseOptionType)}
                />
              </div>
            )}
            <div className="buttonWrapper">
              <button className="pauseButton" onClick={onSubmitClick}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
