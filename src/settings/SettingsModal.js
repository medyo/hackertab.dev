import React, { useContext, useState } from "react";
import ReactModal from 'react-modal';
import "react-toggle/style.css"
import { VscClose } from "react-icons/vsc"
import Select from 'react-select'
import Toggle from 'react-toggle'
import '../App.css';
import './settings.css';
import PreferencesContext from '../preferences/PreferencesContext';
import ConfigurationContext from '../configuration/ConfigurationContext';
import { SUPPORTED_CARDS, APP } from '../Constants'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackAddLanguage, trackRemoveLanguage, trackAddCard, trackRemoveCard, 
  trackOpenLinksNewTab, trackListingModeChange } from "../utils/Analytics"

function SettingsModal({ showSettings, setShowSettings }) {

  const { supportedTags } = useContext(ConfigurationContext)
  const preferences = useContext(PreferencesContext)
  const { dispatcher, cards, userSelectedTags, openLinksNewTab, listingMode } = preferences
  const [selectedCards, setSelectedCards] = useState(cards)

  const handleCloseModal = () => {
    setShowSettings(false)
  }

  const onTagsSelectChange = (tags, metas) => {
    switch (metas.action) {
      case 'select-option':
        trackAddLanguage(metas.option.label)
        break;
      case 'remove-value':
        trackRemoveLanguage(metas.removedValue.label)
        break;
    }

    dispatcher({ type: 'setUserSelectedTags', value: tags })
  }

  const onlistingModeChange = (e) => {
    const value = e.target.checked ? "compact" : "normal";
    trackListingModeChange(value)
    dispatcher({ type: 'changelistingMode', value });
  };

  const onCardSelectChange = (cards, metas) => {
    if (cards.length > 4) {
      return toast.error('You may only pick 4 cards', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }

    switch (metas.action) {
      case 'select-option':
        trackAddCard(metas.option.label)
        break;
      case 'remove-value':
        trackRemoveCard(metas.removedValue.label)
        break;
    }

    let newCards = cards.map((c, index) => {
      return { id: index, name: c.value }
    })
    setSelectedCards(newCards)
    dispatcher({ type: 'setCards', value: newCards })
  }


  const onOpenLinksNewTabChange = (e) => {
    const checked = e.target.checked
    trackOpenLinksNewTab(checked)
    dispatcher({ type: 'setOpenLinksNewTab', value: checked })
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
        <button className="modalCloseBtn" onClick={handleCloseModal}><VscClose size="24" /></button>
      </div>

      <div className="settings">
        <div className="settingRow">
          <p className="settingTitle">Programming languages you're interested in</p>
          <div className="settingContent">
            <Select options={supportedTags}
              defaultValue={userSelectedTags}
              isMulti={true}
              isClearable={false}
              isSearchable={false}
              classNamePrefix={'hackertab'}
              onChange={onTagsSelectChange}
            />
            <p className="settingHint">Missing language or technology? create an issue <a href="#" onClick={(e) => window.open(`${APP.repository}/issues/`, "_blank")}>here</a></p>
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Displayed Cards</p>
          <div className="settingContent">
            <Select options={SUPPORTED_CARDS}
              value={selectedCards.map((c) => ({ label: SUPPORTED_CARDS.find(c2 => c.name == c2.value).label, value: c.name }))}
              onChange={onCardSelectChange}
              isMulti={true}
              isClearable={false}
              isSearchable={false}
              classNamePrefix={'hackertab'} />
            <p className="settingHint">Missing a cool data source? create an issue <a href="#" onClick={(e) => window.open(`${APP.repository}/issues/`, "_blank")}>here</a></p>
          </div>
        </div>

        <div className="settingRow">
          <p className="settingTitle">Open links in a new tab</p>
          <div className="settingContent">
            <Toggle
              checked={openLinksNewTab}
              icons={false}
              onChange={onOpenLinksNewTabChange}
            />
          </div>
        </div>

        <div className='settingRow'>
          <p className='settingTitle'>
            Compact mode
					</p>
          <div className='settingContent'>
            <Toggle
              checked={listingMode == "compact"}
              icons={false}
              onChange={onlistingModeChange}
            />
          </div>
        </div>

      </div>
      <ToastContainer />
    </ReactModal>
  )
}

export default SettingsModal