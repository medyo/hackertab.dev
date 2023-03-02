import { useEffect, useState } from 'react'
import Toggle from 'react-toggle'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { useUserPreferences } from 'src/stores/preferences'

type PausedAppContentProps = {
  isAppPaused: boolean
}

export const PausedAppContent = ({ isAppPaused }: PausedAppContentProps) => {
  const { setPauseTo } = useUserPreferences()
  const [isToggleChecked, setIsToggleChecked] = useState(isAppPaused)

  useEffect(() => {
    setIsToggleChecked(isAppPaused)
  }, [isAppPaused])

  const onPauseToggle = () => {
    setIsToggleChecked(false)
    setTimeout(() => {
      setPauseTo(0)
    }, 550)
  }
  const wrapperClassName = `pauseContentWrapper ${isAppPaused ? 'active' : ''}`

  return (
    <div className={wrapperClassName}>
      {isAppPaused && (
        <>
          <div className="options">
            <Toggle checked={isToggleChecked} onChange={onPauseToggle} />
          </div>
          <div className="searchContainer">
            <SearchBar withLogo={true} />
          </div>
        </>
      )}
    </div>
  )
}
