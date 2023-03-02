import { useState } from 'react'
import Select from 'react-select'
import Toggle from 'react-toggle'

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
  const [selectedNumber, setSelectedNumber] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<PauseOptionType>(pauseOptions[0])

  const onPauseAppChange = () => {
    setIsPauseChecked(!isPauseChecked)
  }
  const onSubmitClick = () => {
    try {
      let pauseValue = parseInt(selectedNumber) * selectedPeriod.value
      if (pauseValue <= 0) {
        throw Error('Invalid value')
      }
      const futureDate = new Date(new Date().getTime() + pauseValue * 60000)
      onSubmit(futureDate.getTime())
    } catch (err) {
      console.log('PauseSettings Error:', err)
    }
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">Pause App</p>
      <div className="settingContent">
        <Toggle checked={isPauseChecked} icons={false} onChange={onPauseAppChange} />
        {isPauseChecked && (
          <div className="pauseFormWrapper">
            <div className="pauseForm">
              <input
                type="number"
                value={selectedNumber}
                onChange={(e) => setSelectedNumber(e.target.value)}
                // value={rssUrl || ''}
                // onChange={(e) => setRssUrl(e.target.value)}
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
