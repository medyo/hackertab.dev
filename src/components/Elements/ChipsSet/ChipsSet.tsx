import { Option } from 'src/types'
import { useState } from 'react'

type ChipProps = {
  option: Option
  onSelect: (option: Option) => void
  active: boolean
}

const Chip = ({ option, onSelect, active = false }: ChipProps) => {
  return (
    <button className={'chip ' + (active && 'active')} onClick={() => onSelect(option)}>
      {option.label}
    </button>
  )
}

type ChipsSetProps = {
  options: Option[]
  defaultValue: Option
  onChange: (option: Option) => void
}

export const ChipsSet = ({ options, onChange, defaultValue }: ChipsSetProps) => {
  const [selectedChip, setSelectedChip] = useState<Option>(defaultValue)

  const onSelect = (option: Option) => {
    setSelectedChip(option)
    onChange(option)
  }

  return (
    <div className="chipsSet">
      {options.map((option) => {
        return (
          <Chip option={option} onSelect={onSelect} active={selectedChip.value === option.value} />
        )
      })}
    </div>
  )
}
