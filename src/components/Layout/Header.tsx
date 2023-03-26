import { useEffect, useRef, useState } from 'react'
import { BsFillBookmarksFill, BsFillGearFill, BsMoon } from 'react-icons/bs'
import { CgTab } from 'react-icons/cg'
import { IoMdSunny } from 'react-icons/io'
import { MdDoDisturbOff } from 'react-icons/md'
import { ReactComponent as HackertabLogo } from 'src/assets/logo.svg'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { UserTags } from 'src/components/Elements/UserTags'
import { Changelog } from 'src/features/changelog'
import { SettingsModal } from 'src/features/settings'
import { identifyUserTheme, trackDNDDisable, trackThemeSelect } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { useUserPreferences } from 'src/stores/preferences'

type HeaderProps = {
  showSideBar: boolean
  setShowSideBar: (show: boolean) => void
  showSettings: boolean
  setShowSettings: (show: boolean) => void
}

export const Header = ({
  showSideBar,
  setShowSideBar,
  showSettings,
  setShowSettings,
}: HeaderProps) => {
  const [themeIcon, setThemeIcon] = useState(<BsMoon />)
  const isFirstRun = useRef(true)
  const { theme, setTheme, setDNDDuration, isDNDModeActive } = useUserPreferences()
  const { userBookmarks } = useBookmarks()

  useEffect(() => {
    document.documentElement.classList.add(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      if (!document.documentElement.classList.contains('transitionBgColor')) {
        document.documentElement.classList.add('transitionBgColor')
      }
    }

    if (theme === 'light') {
      document.documentElement.classList.replace('dark', theme)
      setThemeIcon(<BsMoon />)
    } else if (theme === 'dark') {
      document.documentElement.classList.replace('light', theme)
      setThemeIcon(<IoMdSunny />)
    }
  }, [theme])

  const onThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    trackThemeSelect(newTheme)
    identifyUserTheme(newTheme)
  }

  const onSettingsClick = () => {
    setShowSettings(true)
  }

  const BookmarksBadgeCount = () => {
    return userBookmarks.length > 0 ? (
      userBookmarks.length < 10 ? (
        <span className="badgeCount">{userBookmarks.length}</span>
      ) : (
        <span className="badgeCount">+9</span>
      )
    ) : null
  }

  const onUnpauseClicked = () => {
    trackDNDDisable()
    setDNDDuration(0)
  }

  return (
    <>
      <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings} />

      <header className="AppHeader">
        <span className="AppName">
          <i className="logo">
            <CgTab />
          </i>{' '}
          <HackertabLogo className="logoText" />
          <Changelog />
        </span>
        <SearchBar />
        <div className="extras">
          {isDNDModeActive() && (
            <button className="extraBtn extraTextBtn" onClick={() => onUnpauseClicked()}>
              <MdDoDisturbOff />
              &nbsp;Unpause
            </button>
          )}
          <button className="extraBtn" onClick={onSettingsClick}>
            <BsFillGearFill />
          </button>
          <button className="extraBtn darkModeBtn" onClick={onThemeChange}>
            {themeIcon}
          </button>
          <button className="extraBtn" onClick={() => setShowSideBar(!showSideBar)}>
            <BsFillBookmarksFill />
            <BookmarksBadgeCount />
          </button>
        </div>
        <div className="break"></div>
        <UserTags onAddClicked={onSettingsClick} />
      </header>
    </>
  )
}
