import React from 'react'
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
import { DeleteAccount } from '../UserSettings/DeleteAccount'
import { UserInfo } from '../UserSettings/UserInfo'
import { CardsNumberSettings } from './CardsNumberSettings'
import { DNDSettings } from './DNDSettings'
import './generalSettings.css'
import { LayoutSettings } from './LayoutSettings'

export const GeneralSettings = () => {
  const {
    openLinksNewTab,
    listingMode,
    theme,
    maxVisibleCards,
    setTheme,
    setListingMode,
    setMaxVisibleCards,
    setOpenLinksNewTab,
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

  const onDarkModeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    trackThemeSelect(newTheme)
    identifyUserTheme(newTheme)
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
          <p className="settingTitle">Dark Mode</p>
          <div className="settingContent">
            <Toggle checked={theme === 'dark'} icons={false} onChange={onDarkModeChange} />
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Open links in a new tab</p>
          <div className="settingContent">
            <Toggle checked={openLinksNewTab} icons={false} onChange={onOpenLinksNewTabChange} />
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
