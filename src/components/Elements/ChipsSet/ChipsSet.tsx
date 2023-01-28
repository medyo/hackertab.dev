import { useState } from 'react'
import { Option } from 'src/types'
import './chipset.css'

type ChipProps = {
  option: Option
  onSelect: (option: Option) => void
  active: boolean
}

const Chip = ({ option, onSelect, active = false }: ChipProps) => {
  return (
    <button className={'chip ' + (active && 'active')} onClick={() => onSelect(option)}>
      {option.icon && <span className="chipIcon">{option.icon}</span>}
      {option.label}
    </button>
  )
}
type ChangeAction = 'ADD' | 'REMOVE'
type ChipsSetProps = {
  options: Option[]
  defaultValues?: string[]
  onChange?: (action: ChangeAction, option: Option) => void
}

export const ChipsSet = ({ options, onChange, defaultValues }: ChipsSetProps) => {
  const [selectedChips, setSelectedChips] = useState<string[] | undefined>(defaultValues || [])

  const onSelect = (option: Option) => {
    if (selectedChips?.some((chipValue) => chipValue === option.value)) {
      setSelectedChips((prev) => prev?.filter((chipValue) => chipValue !== option.value))
      onChange && onChange('REMOVE', option)
    } else {
      setSelectedChips((prev) => [...(prev || []), option.value])
      onChange && onChange('ADD', option)
    }
  }

  return (
    <div className="chipsSet">
      {options.map((option) => {
        return (
          <Chip
            key={option.value}
            option={option}
            onSelect={onSelect}
            active={selectedChips?.some((chipValue) => chipValue === option.value) || false}
          />
        )
      })}
    </div>
  )
}
