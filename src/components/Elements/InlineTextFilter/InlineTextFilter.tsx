import DropDownMenu from '../../DropDownMenu'

type Option = {
  label: string
  value: string
}
type InlineTextFilterProps = {
  options: Option[]
  value: string | undefined
  onChange: (option: Option) => void
}

export const InlineTextFilter = ({ options, value, onChange }: InlineTextFilterProps) => {
  const tagId = `inline-text-filter-${Math.random().toString(16).slice(2)}`
  return (
    <DropDownMenu
      data={options}
      tagId={tagId}
      label={options.find((opt) => opt.value === value)?.label || options[0].label}
      setSelectedDropDownItem={(item: Option) => {
        onChange(item)
      }}
    />
  )
}
