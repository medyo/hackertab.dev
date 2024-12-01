import { useEffect, useState } from 'react'
import { BsFillBookmarksFill, BsFillGearFill, BsMoonFill } from 'react-icons/bs'
import { CgTab } from 'react-icons/cg'
import { IoMdSunny } from 'react-icons/io'
import { MdDoDisturbOff } from 'react-icons/md'
import { RxArrowLeft } from 'react-icons/rx'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ReactComponent as HackertabLogo } from 'src/assets/logo.svg'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { UserTags } from 'src/components/Elements/UserTags'
import { Changelog } from 'src/features/changelog'
import { identifyUserTheme, trackDNDDisable, trackThemeSelect } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { useUserPreferences } from 'src/stores/preferences'

export const Header = () => {
  const [themeIcon, setThemeIcon] = useState(<BsMoonFill />)
  const { theme, setTheme, themePreferences, setThemePreferences, setDNDDuration, isDNDModeActive } = useUserPreferences()
  const { userBookmarks } = useBookmarks()
  const navigate = useNavigate()
  const location = useLocation()

  // Check and update theme based on time
  useEffect(() => {
    const checkAutoTheme = () => {
      if (themePreferences.mode === 'auto') {
        const now = new Date()
        const currentHour = now.getHours()
        const { autoStartHour, autoEndHour } = themePreferences

        // If start hour is less than end hour, dark mode is during the same day
        // If start hour is greater than end hour, dark mode spans across midnight
        const isDarkModeTime = autoStartHour <= autoEndHour
          ? currentHour >= autoStartHour || currentHour < autoEndHour
          : currentHour >= autoStartHour && currentHour < autoEndHour

        const newTheme = isDarkModeTime ? 'dark' : 'light'
        if (theme !== newTheme) {
          setTheme(newTheme)
          trackThemeSelect(newTheme)
          identifyUserTheme(newTheme)
        }
      }
    }

    checkAutoTheme()
    const interval = setInterval(checkAutoTheme, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [themePreferences, theme, setTheme])

  useEffect(() => {
    document.documentElement.classList.add(theme)
  }, [])

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.replace('dark', theme)
      setThemeIcon(<BsMoonFill />)
    } else if (theme === 'dark') {
      document.documentElement.classList.replace('light', theme)
      setThemeIcon(<IoMdSunny />)
    }
  }, [theme])

  const onThemeChange = () => {
    if (themePreferences.mode === 'auto') {
      // Switch to manual mode with toggled theme
      setThemePreferences({ mode: 'manual' })
      const newTheme = theme === 'dark' ? 'light' : 'dark'
      setTheme(newTheme)
      trackThemeSelect(newTheme)
      identifyUserTheme(newTheme)
    } else {
      // Already in manual mode, just toggle theme
      const newTheme = theme === 'dark' ? 'light' : 'dark'
      setTheme(newTheme)
      trackThemeSelect(newTheme)
      identifyUserTheme(newTheme)
    }
  }

  const onSettingsClick = () => {
    navigate('/settings/general')
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
    setDNDDuration('never')
  }

  return (
    <>
      <header className="AppHeader">
        <span className="AppName">
          <i className="logo">
            <CgTab />
          </i>{' '}
          <Link to="/">
            <HackertabLogo aria-label="hackertab.dev" className="logoText" />
          </Link>
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
          <button aria-label="Open settings" className="extraBtn" onClick={onSettingsClick}>
            <BsFillGearFill />
          </button>
          <button
            aria-label="Toggle theme"
            className="extraBtn darkModeBtn"
            onClick={onThemeChange}>
            {themeIcon}
          </button>
          <Link to="/settings/bookmarks" className="extraBtn" aria-label="Open bookmarks">
            <>
              <BsFillBookmarksFill />
              <BookmarksBadgeCount />
            </>
          </Link>
        </div>
        {location.pathname === '/' ? (
          <UserTags />
        ) : (
          <div className="backToHome">
            <Link to="/">
              <RxArrowLeft size={20} /> Back
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
