import { useEffect, useRef, useState } from 'react'
import { BsFillBookmarksFill, BsFillGearFill, BsMoon } from 'react-icons/bs'
import { CgTab } from 'react-icons/cg'
import { IoMdSunny } from 'react-icons/io'
import { ReactComponent as HackertabLogo } from 'src/assets/logo.svg'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { UserTags } from 'src/components/Elements/UserTags'
import { Changelog } from 'src/features/changelog'
import { RSSInputModal } from 'src/features/rssFeed'
import { SettingsModal } from 'src/features/settings'
import { identifyUserTheme, trackThemeSelect } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { useUserPreferences } from 'src/stores/preferences'

type HeaderProps = {
  showSideBar: boolean
  setShowSideBar: (show: boolean) => void
  showSettings: boolean
  setShowSettings: (show: boolean) => void
  showRSSInput: boolean
  setShowRSSInput: (show: boolean) => void
}

export const Header = ({
  showSideBar,
  setShowSideBar,
  showSettings,
  setShowSettings,
  showRSSInput,
  setShowRSSInput,
}: HeaderProps) => {
  const [themeIcon, setThemeIcon] = useState(<BsMoon />)
  const isFirstRun = useRef(true)
  const { theme, setTheme } = useUserPreferences()
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

  const onAddSourceClick = () => {
    setShowRSSInput(true)
  }
  return (
    <>
      <SettingsModal showSettings={showSettings} setShowSettings={setShowSettings} />
      <RSSInputModal showRSSInput={showRSSInput} setShowRSSInput={setShowRSSInput} />

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
          <button className="extraBtn" onClick={onAddSourceClick}>
            <BsFillGearFill />
          </button>
        </div>
        <div className="break"></div>
        <UserTags onAddClicked={onSettingsClick} />
      </header>
    </>
  )
}
