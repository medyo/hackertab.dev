import { useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { trackDNDEnable } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'

type DndOption = {
  value: number | 'always'
  label: string
}

const DNDDurations: DndOption[] = [
  { value: 15, label: 'For 15 minutes' },
  { value: 30, label: 'For 30 minutes' },
  { value: 60, label: 'For 1 hour' },
  { value: 'always', label: 'Until you turn off' },
]

type DNDSettingsProps = {
  setShowSettings: (show: boolean) => void
}

export const DNDSettings = ({ setShowSettings }: DNDSettingsProps) => {
  const [selectedDNDDuration, setSelectedDNDDuration] = useState<DndOption['value']>()

  const { DNDDurarion, setDNDDuration } = useUserPreferences()

  const onApplyClicked = () => {
    if (!selectedDNDDuration) {
      return
    }

    if (typeof selectedDNDDuration === 'string') {
      setDNDDuration('always')
    } else {
      const value = selectedDNDDuration as number
      const futureDate = new Date(new Date().getTime() + value * 60000)
      setDNDDuration(futureDate.getTime())
    }

    trackDNDEnable(selectedDNDDuration)
    setShowSettings(false)
  }

  const onPeriodSelect = (selectedOption: SingleValue<DndOption>) => {
    if (!selectedOption) {
      return
    }

    setSelectedDNDDuration(selectedOption.value)
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">
        Do not disturb
        <br />
        <span className="settingHint">(Pause Hackertab for some moment)</span>
      </p>
      <div className="settingContent">
        <div className="form">
          <div style={{ flex: 1 }}>
            <Select
              options={DNDDurations}
              placeholder="For x minutes"
              isMulti={false}
              isClearable={false}
              isSearchable={false}
              value={DNDDurations.find((e) => e.value === DNDDurarion)}
              classNamePrefix={'hackertab'}
              onChange={onPeriodSelect}
            />
          </div>

          <button onClick={onApplyClicked}>Apply</button>
        </div>
      </div>
    </div>
  )
}
