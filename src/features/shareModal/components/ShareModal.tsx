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
import './share.css'

type ShareModalProps = {
  showModal: boolean
  setShowModal: (show: boolean) => void
  shareData: any
}

const sharingButtons = [
  { component: EmailShareButton, icon: EmailIcon, title: 'Mail' },
  { component: FacebookShareButton, icon: FacebookIcon, title: 'Facebook' },
  { component: TwitterShareButton, icon: TwitterIcon, title: 'Twitter' },
  { component: RedditShareButton, icon: RedditIcon, title: 'Reddit' },
  { component: LinkedinShareButton, icon: LinkedinIcon, title: 'Linkedin' },
  { component: TelegramShareButton, icon: TelegramIcon, title: 'Telegram' },
  { component: WhatsappShareButton, icon: WhatsappIcon, title: 'Whatsapp' },
]

export const ShareModal = ({ showModal, setShowModal, shareData }: ShareModalProps) => {
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const copyLink = () => {
    navigator.clipboard.writeText(shareData.link)
  }
  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={() => handleCloseModal()}
      className="shareModal "
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div className="modalHeader">
        <h1 className="modalTitle">Share</h1>
        <button className="modalCloseBtn" onClick={handleCloseModal}>
          <VscClose size="24" />
        </button>
      </div>

      <div className="shareBody">
        <p>{shareData.source}</p>
        <h3>{shareData.title}</h3>
        <div className="shareLink">
          <input type="text" value={shareData.link} disabled />
          <button onClick={copyLink}>
            <VscCopy />
          </button>
        </div>
      </div>

      <div className="shareOptions">
        {sharingButtons.map(({ component: ShareButton, icon: Icon }, index) => (
          <ShareButton key={index} url={shareData.link} title={shareData.title}>
            <Icon size={32} round />
          </ShareButton>
        ))}
      </div>
    </ReactModal>
  )
}
