import { useState } from 'react'
import { VscClose } from 'react-icons/vsc'
import ReactModal from 'react-modal'
import 'react-toggle/style.css'
import { useUserPreferences } from 'src/stores/preferences'
import { SupportedCardType } from 'src/types'
import { isValidURL } from 'src/utils/UrlUtils'
import { getRssUrlFeed } from '../api/getRssFeed'
import './rssModal.css'

type RSSInputModalProps = {
  showRSSInput: boolean
  setShowRSSInput: (url: boolean) => void
}
// SupportedCard

export const RSSInputModal = ({ showRSSInput, setShowRSSInput }: RSSInputModalProps) => {
  const { userCustomCards, setUserCustomCards, cards, setCards } = useUserPreferences()

  const [rssUrl, setRssUrl] = useState('')
  const [error, setError] = useState('Error')

  const handleCloseModal = () => {
    setShowRSSInput(false)
  }

  const onAddClick = async () => {
    if (!isValidURL(rssUrl)) {
      setError('Not Valid URL')
      return
    }

    // check if card exists
    const exists = userCustomCards.find((card) => card.feedUrl === rssUrl)
    if (exists) {
      setError('Card Exists')
      return
    }

    // get rssUrl Info
    try {
      const info = await getRssUrlFeed(rssUrl)
      let customCard: SupportedCardType = {
        feedUrl: rssUrl.replace('https:', 'http:'),
        label: info.title,
        value: info.title.toLowerCase(),
        analyticsTag: info.title.toLowerCase(),
        link: info.link,
        type: 'rss',
        // icon: <BsFillRssFill className="blockHeaderWhite" />,
      }
      // add card to userCustomCards and selected cards
      setUserCustomCards([...userCustomCards, customCard])
      setCards([...cards, { id: cards.length, name: customCard.value, type: customCard.type }])
      handleCloseModal()
    } catch (err) {
      setError('Error occured, check the URL')
    }
  }

  return (
    <ReactModal
      isOpen={showRSSInput}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={handleCloseModal}
      contentLabel="Minimal Modal Example"
      className="RSSModal"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div className="modalHeader">
        <h1 className="modalTitle">Enterr URL</h1>
        <button className="modalCloseBtn" onClick={handleCloseModal}>
          <VscClose size="24" />
        </button>
      </div>

      <div className="settings">
        <div className="settingRow">
          <p className="settingTitle">Enter RSS URL</p>
          <div className="settingContent">
            <input
              className="rssUrlInput"
              value={rssUrl}
              onChange={(e) => setRssUrl(e.target.value)}
            />
          </div>
          <div>
            <button onClick={onAddClick}>ADD</button>
          </div>
        </div>
        {error && (
          <div className="settingRow">
            <p>{error}</p>
          </div>
        )}
      </div>
    </ReactModal>
  )
}
