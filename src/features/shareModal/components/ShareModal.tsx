import { VscClose, VscCopy } from 'react-icons/vsc'
import ReactModal from 'react-modal'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import toast from 'react-simple-toasts'
import { ShareModalData } from '../types'
import './share.css'

type ShareModalProps = {
  showModal: boolean
  closeModal: () => void
  shareData: ShareModalData | undefined
}

const sharingButtons = [
  { component: EmailShareButton, icon: EmailIcon },
  { component: FacebookShareButton, icon: FacebookIcon },
  { component: TwitterShareButton, icon: TwitterIcon },
  { component: RedditShareButton, icon: RedditIcon },
  { component: LinkedinShareButton, icon: LinkedinIcon },
  { component: TelegramShareButton, icon: TelegramIcon },
  { component: WhatsappShareButton, icon: WhatsappIcon },
]

export const ShareModal = ({ showModal, closeModal, shareData }: ShareModalProps) => {
  if (!shareData) {
    return null
  }

  const { title, link, source } = shareData

  const onCopyClicked = () => {
    toast('Link copied to clipboard', { theme: 'defaultToast' })
    navigator.clipboard.writeText(shareData.link)
  }

  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={true}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={() => closeModal()}
      className="Modal scrollable shareModal"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div className="modalHeader">
        <h1 className="modalTitle">Share</h1>
        <button
          className="modalCloseBtn"
          onClick={() => closeModal()}
          aria-label="Close share modal">
          <VscClose size="24" />
        </button>
      </div>

      <div className="shareBody">
        <p className="source">{shareData.source}</p>
        <h3 className="title">{title}</h3>
        <a className="link" href={link} target="_blank">
          {link}
        </a>
      </div>

      <div className="shareOptions">
        <h3>Share via</h3>
        <div className="shareButtons">
          {sharingButtons.map(({ component: ShareButton, icon: Icon }, index) => (
            <ShareButton key={index} url={link} title={title}>
              <Icon size={38} round />
            </ShareButton>
          ))}
        </div>
      </div>

      <div className="shareOptions">
        <h3>Or copy link</h3>
        <div className="settingRow">
          <div className="settingContent">
            <div className="form">
              <input type="text" value={link} disabled />
              <button aria-label="Copy url to clipboard" onClick={() => onCopyClicked()}>
                <VscCopy /> Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  )
}
