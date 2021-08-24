import React, { useEffect, useRef, useState } from 'react'
import { BsFillGearFill } from "react-icons/bs"
import { CgTab } from 'react-icons/cg';
import { BsFillBookmarksFill } from "react-icons/bs"
import { ReactComponent as HackertabLogo } from '../logo.svg';
import UserTags from "./UserTags";
import { APP } from '../Constants';
import SettingsModal from "../settings/SettingsModal";
import { BsMoon } from "react-icons/bs"
import { IoMdSunny } from "react-icons/io"
import { trackThemeChange } from "../utils/Analytics"


function Header({ state, dispatcher, showSideBar, setShowSideBar, showSettings, setShowSettings }) {
  const [themeIcon, setThemeIcon] = useState(<BsMoon />)
  const isFirstRun = useRef(true)

  useEffect(() => {
    document.documentElement.classList.add(state.theme)
  }, [])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      if (!document.documentElement.classList.contains('transitionBgColor')) {
        document.documentElement.classList.add('transitionBgColor')
      }
      trackThemeChange(state.theme)
    }

    if (state.theme === 'light') {
      document.documentElement.classList.replace('dark', state.theme)
      setThemeIcon(<BsMoon />)
    } else if (state.theme === 'dark') {
      document.documentElement.classList.replace('light', state.theme)
      setThemeIcon(<IoMdSunny />)
    }
  }, [state?.theme])

  const onThemeChange = () => {
    dispatcher({ type: 'toggleTheme' })
  }

  const onSettingsClick = () => {
    setShowSettings(true)
  }

  const BookmarksBadgeCount = () => {
    return state.userBookmarks.length > 0 ? (
      state.userBookmarks.length < 10 ? (
        <span className="badgeCount">{state.userBookmarks.length}</span>
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
        </span>
        <div className="slogan">{APP.slogan}</div>
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
        <UserTags userSelectedTags={state.userSelectedTags} onAddClicked={onSettingsClick} />
      </header>
    </>
  )
}

export default Header;