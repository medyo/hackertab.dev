import { useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { trackDNDEnable } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { diffBetweenTwoDatesInMinutes } from 'src/utils/DateUtils'

type DndOption = {
  value: number | 'always'
  label: string
}

const DNDDurations: DndOption[] = [
  { value: 15, label: 'For 15 minutes' },
  { value: 30, label: 'For 30 minutes' },
  { value: 60, label: 'For 1 hour' },
  { value: 'always', label: 'Until you turn it off' },
]

type DNDSettingsProps = {
  setShowSettings: (show: boolean) => void
}

export const DNDSettings = ({ setShowSettings }: DNDSettingsProps) => {
  const [selectedDNDDuration, setSelectedDNDDuration] = useState<DndOption['value']>()

  const { DNDDuration, setDNDDuration } = useUserPreferences()

  const onApplyClicked = () => {
    if (!selectedDNDDuration) {
      return
    }

    if (typeof selectedDNDDuration === 'string') {
      setDNDDuration(selectedDNDDuration)
    } else {
      const value = selectedDNDDuration as number
      const futureDate = new Date()
      futureDate.setMinutes(futureDate.getMinutes() + value)
      setDNDDuration({
        value: selectedDNDDuration,
        countdown: futureDate.getTime(),
      })
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

  const getDefaultValue = (): DndOption | undefined => {
    if (typeof DNDDuration === 'string') {
      return DNDDurations.find((e) => e.value === DNDDuration)
    } else if (typeof DNDDuration === 'object') {
      const DNDDurationObject = DNDDuration as {
        value: number
        countdown: number
      }
      return DNDDurations.find((e) => e.value === DNDDurationObject.value)
    }
  }

  const timeoutLabel = (): string | undefined => {
    if (typeof DNDDuration === 'object') {
      const DNDDurationObject = DNDDuration as {
        value: number
        countdown: number
      }
      const futureDate = new Date(DNDDurationObject.countdown)
      const now = new Date()
      return `DND will turn off in ${diffBetweenTwoDatesInMinutes(
        futureDate.getTime(),
        now.getTime()
      )} Minutes`
    }

    return undefined
  }
  return (
    <div className="settingRow">
      <p className="settingTitle">
        Do not disturb
        <br />
        <span className="settingHint">Pause Hackertab for a period of time</span>
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
              defaultValue={getDefaultValue()}
              classNamePrefix={'hackertab'}
              onChange={onPeriodSelect}
            />
          </div>

          <button onClick={onApplyClicked}>Apply</button>
        </div>
        {timeoutLabel() && (
          <div className="settingHint">
            <p>{timeoutLabel()}</p>
          </div>
        )}
      </div>
    </div>
  )
}
