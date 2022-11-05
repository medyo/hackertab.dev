import React, { useEffect, useRef, useState } from 'react'
import { BsFillGearFill } from 'react-icons/bs'
import { CgTab } from 'react-icons/cg'
import { BsFillBookmarksFill } from 'react-icons/bs'
import { ReactComponent as HackertabLogo } from 'src/assets/logo.svg'
import { UserTags } from './Elements/UserTags'
import { SettingsModal } from 'src/features/settings'
import { BsMoon } from 'react-icons/bs'
import { IoMdSunny } from 'react-icons/io'
import { Changelog } from 'src/features/changelog'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { useUserPreferences } from 'src/stores/preferences'
import { useBookmarks } from 'src/stores/bookmarks'

function Header({ showSideBar, setShowSideBar, showSettings, setShowSettings }) {
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
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
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

export default Header
