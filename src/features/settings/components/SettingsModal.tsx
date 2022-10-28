import React, { useContext, useState } from 'react'
import ReactModal from 'react-modal'
import 'react-toggle/style.css'
import { VscClose } from 'react-icons/vsc'
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select'
import { SearchEngineType } from 'src/types'
import Toggle from 'react-toggle'
import './settings.css'
import PreferencesContext from 'src/preferences/PreferencesContext'
import ConfigurationContext from 'src/configuration/ConfigurationContext'
import { SUPPORTED_CARDS, SUPPORTED_SEARCH_ENGINES, APP } from 'src/Constants'
import {
  trackLanguageAdd,
  trackLanguageRemove,
  trackSourceAdd,
  trackSourceRemove,
  trackSearchEngineSelect,
  trackListingModeSelect,
  trackTabTarget,
} from 'src/lib/analytics'

type SettingsModalProps = {
  showSettings: boolean
  setShowSettings: (show: boolean) => void
}

type OptionType = {
  value: string
  label: string
}

export const SettingsModal = ({ showSettings, setShowSettings }: SettingsModalProps) => {
  const { supportedTags } = useContext(ConfigurationContext)
  const preferences = useContext(PreferencesContext)
  const { dispatcher, cards, userSelectedTags, openLinksNewTab, listingMode, theme, searchEngine } =
    preferences
  const [selectedCards, setSelectedCards] = useState(cards)

  const handleCloseModal = () => {
    setShowSettings(false)
  }

  const onTagsSelectChange = (tags: MultiValue<OptionType>, metas: ActionMeta<OptionType>) => {
    switch (metas.action) {
      case 'select-option':
        if (metas.option?.label) {
          trackLanguageAdd(metas.option.label)
        }
        break
      case 'remove-value':
        if (metas.removedValue?.label) {
          trackLanguageRemove(metas.removedValue.label)
        }

        break
    }

    dispatcher({ type: 'setUserSelectedTags', value: tags })
  }

  const onlistingModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? 'compact' : 'normal'
    trackListingModeSelect(value)
    dispatcher({ type: 'changelistingMode', value })
  }

  const onCardSelectChange = (cards: MultiValue<OptionType>, metas: ActionMeta<OptionType>) => {
    switch (metas.action) {
      case 'select-option':
        if (metas.option?.label) {
          trackSourceAdd(metas.option.label)
        }
        break
      case 'remove-value':
        if (metas.removedValue?.label) {
          trackSourceRemove(metas.removedValue.label)
        }
        break
    }

    let newCards = cards.map((c, index) => {
      return { id: index, name: c.value }
    })
    setSelectedCards(newCards)
    dispatcher({ type: 'setCards', value: newCards })
  }

  const onSearchEngineSelectChange = (value: SingleValue<SearchEngineType>) => {
    if (!value) {
      return
    }

    trackSearchEngineSelect(value.label)
    dispatcher({ type: 'setSearchEngine', value })
  }

  const onOpenLinksNewTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    trackTabTarget(checked)
    dispatcher({ type: 'setOpenLinksNewTab', value: checked })
  }

  const onDarkModeChange = () => {
    dispatcher({ type: 'toggleTheme' })
  }

  return (
    <ReactModal
      isOpen={showSettings}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Minimal Modal Example"
      className="Modal"
      overlayClassName="Overlay">
      <div className="modalHeader">
        <h1 className="modalTitle">Settings</h1>
        <button className="modalCloseBtn" onClick={handleCloseModal}>
          <VscClose size="24" />
        </button>
      </div>

      <div className="settings">
        <div className="settingRow">
          <p className="settingTitle">Programming languages you're interested in</p>
          <div className="settingContent">
            <Select
              options={supportedTags}
              defaultValue={userSelectedTags}
              isMulti={true}
              isClearable={false}
              isSearchable={false}
              classNamePrefix={'hackertab'}
              onChange={onTagsSelectChange}
            />
            <p className="settingHint">
              Missing language or technology? create an issue{' '}
              <a href="#" onClick={(e) => window.open(APP.supportLink, '_blank')}>
                here
              </a>
            </p>
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Displayed Cards</p>
          <div className="settingContent">
            <Select
              options={SUPPORTED_CARDS}
              value={selectedCards.map((c) => ({
                label: SUPPORTED_CARDS.find((c2) => c.name === c2.value)?.label || '',
                value: c.name,
              }))}
              onChange={onCardSelectChange}
              isMulti={true}
              isClearable={false}
              isSearchable={false}
              classNamePrefix={'hackertab'}
            />
            <p className="settingHint">
              Missing a cool data source? create an issue{' '}
              <a href="#" onClick={(_e) => window.open(APP.supportLink, '_blank')}>
                here
              </a>
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

        <div className="settingRow">
          <p className="settingTitle">Favorite search engine</p>
          <div className="settingContent">
            <Select
              options={SUPPORTED_SEARCH_ENGINES}
              value={SUPPORTED_SEARCH_ENGINES.find((e) => e.label === searchEngine)}
              isMulti={false}
              isClearable={false}
              isSearchable={false}
              classNamePrefix={'hackertab'}
              onChange={onSearchEngineSelectChange}
            />
            <p className="settingHint">
              Missing a search engine? create an issue{' '}
              <a href="#" onClick={(e) => window.open(APP.supportLink, '_blank')}>
                here
              </a>
            </p>
          </div>
        </div>
      </div>
    </ReactModal>
  )
  return <div></div>
}
