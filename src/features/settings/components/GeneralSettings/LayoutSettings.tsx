import { IoGridSharp } from 'react-icons/io5'
import { TfiLayoutColumn4Alt } from 'react-icons/tfi'
import Select, {
  GroupBase,
  OptionProps,
  SingleValue,
  SingleValueProps,
  components,
} from 'react-select'
import { identifyDisplayLayout, trackDisplayTypeChange } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Layout } from 'src/types'

type LayoutOption = {
  label: string
  value: Layout
  icon: React.ReactNode
}

const Layouts: LayoutOption[] = [
  { value: 'grid', label: 'Grid', icon: <IoGridSharp /> },
  { value: 'cards', label: 'Cards', icon: <TfiLayoutColumn4Alt /> },
]

const IconOption = (props: OptionProps<LayoutOption, false, GroupBase<LayoutOption>>) => (
  <components.Option {...props}>
    <div className="optionIcon">
      {props.data.icon}
      {props.data.label}
    </div>
  </components.Option>
)

const SingleIconOption = (
  props: SingleValueProps<LayoutOption, false, GroupBase<LayoutOption>>
) => (
  <components.SingleValue {...props}>
    <div className="optionIcon">
      {props.data.icon}
      {props.data.label}
    </div>
  </components.SingleValue>
)

export const LayoutSettings = () => {
  const { layout, setLayout } = useUserPreferences()

  const onPeriodSelect = (selectedOption: SingleValue<LayoutOption>) => {
    if (!selectedOption) {
      return
    }

    setLayout(selectedOption.value)
    identifyDisplayLayout(selectedOption.value)
    trackDisplayTypeChange(selectedOption.value)
  }

  const getDefaultValue = (): LayoutOption | undefined => {
    return Layouts.find((e) => e.value === layout)
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">Layout Style</p>
      <div className="settingContent">
        <div className="form">
          <div style={{ flex: 1 }}>
            <Select
              options={Layouts}
              components={{ Option: IconOption, SingleValue: SingleIconOption }}
              isMulti={false}
              isClearable={false}
              isSearchable={false}
              defaultValue={getDefaultValue()}
              classNamePrefix={'hackertab'}
              onChange={onPeriodSelect}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
