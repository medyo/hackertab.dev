import clsx from 'clsx'
import { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { Option } from 'src/types'
import { Button } from '../Button'
import './chipset.css'
type ChipProps = {
  option: Option
  onSelect: (option: Option) => void
  onRemove?: (option: Option) => void
  active: boolean
}

const Chip = ({ option, onSelect, onRemove, active = false }: ChipProps) => {
  return (
    <Button
      onClick={() => onSelect(option)}
      type={`${active ? 'primary' : 'secondary'}`}
      size="md"
      startIcon={
        // TODO we should search find svg icons for sources.
        option.icon && (
          <span className="h-[20px] w-[20px] rounded-full bg-white p-[2px] text-black dark:bg-transparent">
            {option.icon}
          </span>
        )
      }
      endIcon={
        option.removeable &&
        onRemove && (
          <button onClick={() => onRemove(option)}>
            <IoIosClose size={24} />
          </button>
        )
      }>
      {option.label}
    </Button>
  )
}
type ChangeAction = {
  option: Option
  action: 'ADD' | 'REMOVE'
}
type ChipsSetProps = {
  options: Option[]
  className?: string
  defaultValues?: string[]
  canSelectMultiple?: boolean
  onChange?: (changes: ChangeAction, options: Option[]) => void
  onRemove?: (option: Option) => void
}

export const ChipsSet = ({
  className,
  options,
  canSelectMultiple = false,
  onChange,
  onRemove,
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
          {
            option,
            action: 'REMOVE',
          },
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
          {
            option,
            action: 'ADD',
          },
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
            onRemove={onRemove}
            active={selectedChips?.some((chipValue) => chipValue === option.value) || false}
          />
        )
      })}
    </div>
  )
}
