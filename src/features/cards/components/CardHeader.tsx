import { MY_LANGUAGES_OPTION } from '../config'

type HeaderTitleProps = {
  label: string
  fallbackTag: {
    label: string
    value: string
  }
  selectedTag: {
    label: string
    value: string
  }
  children?: React.ReactNode
}
export const CardHeader = ({ label, fallbackTag, selectedTag, children }: HeaderTitleProps) => {
  if (children) {
    return <>{children}</>
  }

  if (!selectedTag || selectedTag.value === fallbackTag.value) {
    return <>{label}</>
  }

  if (selectedTag.value === MY_LANGUAGES_OPTION.value) {
    return (
      <>
        {label} <span className="blockHeaderHighlight">{MY_LANGUAGES_OPTION.label}</span>
      </>
    )
  }

  return (
    <>
      {label}
      <span className="blockHeaderHighlight">{selectedTag.label}</span>
    </>
  )
}
