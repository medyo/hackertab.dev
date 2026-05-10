import React from 'react'
import { BsMoonFill } from 'react-icons/bs'
import { IoMdSunny } from 'react-icons/io'
import { MdMonitor } from 'react-icons/md'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Footer } from 'src/components/Layout'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout'
import {
  identifyUserLinksInNewTab,
  identifyUserListingMode,
  identifyUserTheme,
  trackListingModeSelect,
  trackTabTarget,
  trackThemeSelect,
} from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Theme } from 'src/types'
import { DeleteAccount } from '../UserSettings/DeleteAccount'
import { UserInfo } from '../UserSettings/UserInfo'
import { CardsNumberSettings } from './CardsNumberSettings'
import { DNDSettings } from './DNDSettings'
import './generalSettings.css'
import { LayoutSettings } from './LayoutSettings'

const themeIcons = {
  light: <IoMdSunny />,
  dark: <BsMoonFill />,
  system: <MdMonitor />,
}

export const GeneralSettings = () => {
  const {
    openLinksNewTab,
    listingMode,
    theme,
    maxVisibleCards,
    showReadPosts,
    setTheme,
    setListingMode,
    setMaxVisibleCards,
    setOpenLinksNewTab,
    setShowReadPosts,
  } = useUserPreferences()

  const onOpenLinksNewTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    trackTabTarget(checked)
    identifyUserLinksInNewTab(checked)
    setOpenLinksNewTab(checked)
  }

  const onlistingModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? 'compact' : 'normal'
    trackListingModeSelect(value)
    identifyUserListingMode(value)
    setListingMode(value)
  }

  const onThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    trackThemeSelect(newTheme)
    identifyUserTheme(newTheme)
  }

  const onShowReadPostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowReadPosts(e.target.checked)
  }

  return (
    <SettingsContentLayout
      title="General Settings"
      description={
        'Customize your experience by selecting the number of cards you want to see, the search engine you want to use and more.'
      }>
      <div>
        <UserInfo />
        <LayoutSettings />
        <CardsNumberSettings />

        <div className="settingRow">
          <p className="settingTitle">Theme</p>
          <div className="settingContent">
            <div className="themeSelector">
              {(['light', 'dark', 'system'] as Theme[]).map((option) => (
                <label key={option} className={`themeOption${theme === option ? ' active' : ''}`}>
                  <input
                    type="radio"
                    name="theme"
                    value={option}
                    checked={theme === option}
                    onChange={() => onThemeChange(option)}
                  />
                  {themeIcons[option]}
                  <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Open links in a new tab</p>
          <div className="settingContent">
            <Toggle checked={openLinksNewTab} icons={false} onChange={onOpenLinksNewTabChange} />
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Display read posts</p>
          <div className="settingContent">
            <Toggle checked={showReadPosts} icons={false} onChange={onShowReadPostsChange} />
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Compact mode</p>
          <div className="settingContent">
            <Toggle
              checked={listingMode === 'compact'}
              icons={false}
              onChange={onlistingModeChange}
            />
          </div>
        </div>

        <DNDSettings />

        <DeleteAccount />

        <Footer />
      </div>
    </SettingsContentLayout>
  )
}
