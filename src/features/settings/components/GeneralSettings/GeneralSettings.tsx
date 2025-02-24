import React from 'react'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Button, ChipsSet } from 'src/components/Elements'
import { Footer } from 'src/components/Layout'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout'
import { useAuth, User } from 'src/features/auth'
import {
  identifyUserLinksInNewTab,
  identifyUserListingMode,
  identifyUserMaxVisibleCards,
  identifyUserTheme,
  trackListingModeSelect,
  trackMaxVisibleCardsChange,
  trackTabTarget,
  trackThemeSelect,
} from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Option } from 'src/types'
import { DNDSettings } from './DNDSettings'
import './generalSettings.css'

interface UserInfoProps {
  user: User
}

const UserInfo = ({ user }: UserInfoProps) => {
  const { logout, providerId } = useAuth()

  return (
    <div className="userContent">
      {user?.imageURL && <img src={user.imageURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{user.name}</div>
        <div className="providerId">Logged using {providerId}</div>
      </div>
      <Button className="logoutBtn" onClick={logout}>
        Logout
      </Button>
    </div>
  )
}

export const GeneralSettings = () => {
  const {
    openLinksNewTab,
    listingMode,
    theme,
    searchEngine,
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

  const onMaxVisibleCardsChange = (selectedChips: Option[]) => {
    if (selectedChips.length) {
      const maxVisibleCards = parseInt(selectedChips[0].value)
      setMaxVisibleCards(maxVisibleCards)
      identifyUserMaxVisibleCards(maxVisibleCards)
      trackMaxVisibleCardsChange(maxVisibleCards)
    }
  }

  const { user } = useAuth()

  return (
    <SettingsContentLayout
      title="General Settings"
      description={
        'Customize your experience by selecting the number of cards you want to see, the search engine you want to use and more.'
      }>
      <div>
        {user != null && <UserInfo user={user} />}
        <div className="settingRow">
          <p className="settingTitle">Max number of cards to display</p>
          <div className="settingContent">
            <ChipsSet
              className={'noMargin alternative-color'}
              canSelectMultiple={false}
              options={[
                {
                  label: '3 cards',
                  value: '3',
                },
                {
                  label: '4 cards',
                  value: '4',
                },
                {
                  label: '5 cards',
                  value: '5',
                },
                {
                  label: '6 cards',
                  value: '6',
                },
              ]}
              defaultValues={[maxVisibleCards.toString()]}
              onChange={(_, selectedChips) => {
                onMaxVisibleCardsChange(selectedChips)
              }}
            />

            <p className="settingHint">
              To ensure a seamless experience, we may adjust the selected number to align with the
              resolution of your screen.
            </p>
          </div>
        </div>

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

        <Footer />
      </div>
    </SettingsContentLayout>
  )
}
