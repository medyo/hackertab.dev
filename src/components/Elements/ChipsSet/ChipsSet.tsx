import clsx from 'clsx'
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
  className?: string
  defaultValues?: string[]
  canSelectMultiple?: boolean
  onChange?: (action: ChangeAction, options: Option[]) => void
}

export const ChipsSet = ({
  className,
  options,
  canSelectMultiple = false,
  onChange,
  defaultValues,
}: ChipsSetProps) => {
  const [selectedChips, setSelectedChips] = useState<string[] | undefined>(defaultValues || [])

  const onSelect = (option: Option) => {
    if (selectedChips?.some((chipValue) => chipValue === option.value)) {
      if (!canSelectMultiple) {
        return
      }
      const newVal = selectedChips?.filter((chipValue) => chipValue !== option.value)
      setSelectedChips(newVal)
      onChange &&
        onChange(
          'REMOVE',
          options.filter((opt) => newVal.some((selectedVal) => selectedVal === opt.value))
        )
    } else {
      let newVal: string[] = []
      if (canSelectMultiple) {
        newVal = [...(selectedChips || []), option.value]
      } else {
        newVal = [option.value]
      }

      setSelectedChips(newVal)
      onChange &&
        onChange(
          'ADD',
          options.filter((opt) => newVal.some((selectedVal) => selectedVal === opt.value))
        )
    }
  }

  return (
    <div className={clsx('chipsSet', className)}>
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
