import { CgTab } from 'react-icons/cg'
import { MdOutlineAirplanemodeInactive } from 'react-icons/md'
import { ReactComponent as HackertabLogo } from 'src/assets/logo.svg'
import { SearchBarWithLogo } from 'src/components/Elements'
import { useUserPreferences } from 'src/stores/preferences'

type PausedAppContentProps = {
  isAppPaused: boolean
}

export const PausedAppContent = ({ isAppPaused }: PausedAppContentProps) => {
  const { setPauseTo } = useUserPreferences()

  const onUnpauseClicked = () => {
    setTimeout(() => {
      setPauseTo(0)
    }, 200)
  }
  const wrapperClassName = `pauseContentWrapper ${isAppPaused ? 'active' : ''}`

  return (
    <div className={wrapperClassName}>
      {isAppPaused && (
        <>
          <header className="AppHeader">
            <span className="AppName">
              <i className="logo">
                <CgTab />
              </i>{' '}
              <HackertabLogo className="logoText" />
            </span>
            <div className="extras marginLeftAuto">
              <button className="extraBtn extraTextBtn" onClick={() => onUnpauseClicked()}>
                <MdOutlineAirplanemodeInactive />
                &nbsp;Unpause Hackertab
              </button>
            </div>
          </header>

          <div className="searchContainer">
            <SearchBarWithLogo />
          </div>
        </>
      )}
    </div>
  )
}
