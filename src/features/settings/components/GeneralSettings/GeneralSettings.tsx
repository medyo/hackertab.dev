import React from 'react'
import Select, { SingleValue } from 'react-select'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { ChipsSet } from 'src/components/Elements'
import { Footer } from 'src/components/Layout'
import { SettingsContentLayout } from 'src/components/Layout/SettingsContentLayout'
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
import { Option, ThemeMode } from 'src/types'
import { DNDSettings } from './DNDSettings'
import './generalSettings.css'

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
    themePreferences,
    setThemePreferences,
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

  const onThemeModeChange = (mode: ThemeMode) => {
    setThemePreferences({ mode })
    if (mode === 'auto') {
      // Immediately check and apply the correct theme based on time
      const now = new Date()
      const currentHour = now.getHours()
      const { autoStartHour, autoEndHour } = themePreferences

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

  const onDarkModeStartTimeChange = (startHour: number) => {
    setThemePreferences({
      autoStartHour: startHour,
    })
  }

  const onDarkModeEndTimeChange = (endHour: number) => {
    setThemePreferences({
      autoEndHour: endHour,
    })
  }

  const onMaxVisibleCardsChange = (selectedChips: Option[]) => {
    if (selectedChips.length) {
      const maxVisibleCards = parseInt(selectedChips[0].value)
      setMaxVisibleCards(maxVisibleCards)
      identifyUserMaxVisibleCards(maxVisibleCards)
      trackMaxVisibleCardsChange(maxVisibleCards)
    }
  }

  interface ThemeModeOption {
    value: ThemeMode
    label: string
  }

  const themeModeOptions: ThemeModeOption[] = [
    { value: 'manual', label: 'Manual' },
    { value: 'auto', label: 'Automatic (Time-based)' },
  ]

  return (
    <SettingsContentLayout
      title="General Settings"
      description={
        'Customize your experience by selecting the number of cards you want to see, the search engine you want to use and more.'
      }>
      <div>
        <div className="settingsGroup">
          <div className="settingsGroupTitle">Theme Settings</div>
          <div className="settingsGroupContent">
            <div className="settingRow">
              <div>
                <p className="settingTitle">Theme Mode</p>
                <p className="settingHint">Choose how you want the theme to be controlled</p>
              </div>
              <div className="settingContent">
                <Select
                  value={themeModeOptions.find(option => option.value === themePreferences.mode)}
                  onChange={(newValue) => onThemeModeChange((newValue as SingleValue<ThemeModeOption>)?.value as ThemeMode)}
                  options={themeModeOptions}
                  className="hackertab"
                  classNamePrefix="hackertab"
                  isSearchable={false}
                />
              </div>
            </div>

            {themePreferences.mode === 'manual' && (
              <div className="settingRow darkModeSettingRow">
                <div>
                  <p className="settingTitle">Dark Mode</p>
                  <p className="settingHint">Toggle between light and dark themes</p>
                </div>
                <div className="settingContent">
                  <Toggle checked={theme === 'dark'} icons={false} onChange={onDarkModeChange} />
                </div>
              </div>
            )}

            {themePreferences.mode === 'auto' && (
              <div className="settingRow">
                <div>
                  <p className="settingTitle">Dark Mode Hours</p>
                  <p className="settingHint">Set when dark mode should be active (24-hour format)</p>
                </div>
                <div className="settingContent">
                  <div className="timeInputs">
                    <input
                      type="number"
                      min="0"
                      max="23"
                      className="timeInput"
                      value={themePreferences.autoStartHour}
                      onChange={(e) => onDarkModeStartTimeChange(Number(e.target.value))}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="0"
                      max="23"
                      className="timeInput"
                      value={themePreferences.autoEndHour}
                      onChange={(e) => onDarkModeEndTimeChange(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

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
          <div>
            <p className="settingTitle">Open links in a new tab</p>
          </div>
          <div className="settingContent">
            <Toggle checked={openLinksNewTab} icons={false} onChange={onOpenLinksNewTabChange} />
          </div>
        </div>

        <div className="settingRow">
          <div>
            <p className="settingTitle">Compact mode</p>
          </div>
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
