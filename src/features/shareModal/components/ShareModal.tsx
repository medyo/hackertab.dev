import {
  FaFacebookSquare,
  FaLinkedinIn,
  FaMailBulk,
  FaRedditSquare,
  FaTelegram,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa'
import { VscClose, VscCopy } from 'react-icons/vsc'
import ReactModal from 'react-modal'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import './share.css'

type ShareModalProps = {
  showModal: boolean
  setShowModal: (show: boolean) => void
  data: any
}

const sharingButtons = [
  { component: EmailShareButton, icon: FaMailBulk, title: 'Mail' },
  { component: FacebookShareButton, icon: FaFacebookSquare, title: 'Facebook' },
  { component: TwitterShareButton, icon: FaTwitterSquare, title: 'Twitter' },
  { component: RedditShareButton, icon: FaRedditSquare, title: 'Reddit' },
  { component: LinkedinShareButton, icon: FaLinkedinIn, title: 'Linkedin' },
  { component: TelegramShareButton, icon: FaTelegram, title: 'Telegram' },
  { component: WhatsappShareButton, icon: FaWhatsappSquare, title: 'Whatsapp' },
]

export const ShareModal = ({ showModal, setShowModal, data }: ShareModalProps) => {
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const copyLink = () => {
    navigator.clipboard.writeText(data.link)
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
        <p>{data.source}</p>
        <h3>{data.title}</h3>
        <div className="shareLink">
          <input type="text" value={data.link} disabled />
          <button onClick={copyLink}>
            <VscCopy />
          </button>
        </div>
      </div>

      <div className="shareOptions">
        {sharingButtons.map(({ component: ShareButton, icon: Icon, title: Title }, index) => (
          <ShareButton key={index} url={data.link}>
            <Icon size={32} title={Title} />
          </ShareButton>
        ))}
      </div>
    </ReactModal>
  )
}
