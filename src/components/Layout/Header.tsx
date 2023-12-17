import { useEffect, useState } from 'react'
import { BsFillBookmarksFill, BsFillGearFill, BsMoonFill } from 'react-icons/bs'
import { CgTab } from 'react-icons/cg'
import { IoMdSunny } from 'react-icons/io'
import { MdDoDisturbOff } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as HackertabLogo } from 'src/assets/logo.svg'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { UserTags } from 'src/components/Elements/UserTags'
import { Changelog } from 'src/features/changelog'
import { identifyUserTheme, trackDNDDisable, trackThemeSelect } from 'src/lib/analytics'
import { useBookmarks } from 'src/stores/bookmarks'
import { useUserPreferences } from 'src/stores/preferences'

export const Header = () => {
  const [themeIcon, setThemeIcon] = useState(<BsMoonFill />)
  const { theme, setTheme, setDNDDuration, isDNDModeActive } = useUserPreferences()
  const { userBookmarks } = useBookmarks()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.add(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    trackThemeSelect(newTheme)
    identifyUserTheme(newTheme)
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
        <UserTags />
      </header>
    </>
  )
}
