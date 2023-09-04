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
  link: string
}

export const ShareModal = ({ showModal, setShowModal, link }: ShareModalProps) => {
  const handleCloseModal = () => {
    setShowModal(false)
  }
  const copyLink = () => {
    navigator.clipboard.writeText(link)
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

      <div className="shareValue">
        <input type="text" className="link" value={link} disabled />
        <button className="copy" onClick={copyLink}>
          <VscCopy />
        </button>
      </div>

      <div className="shareOptions">
        <FacebookShareButton url={link}>
          <FaFacebookSquare size={32} />
        </FacebookShareButton>

        <TwitterShareButton url={link}>
          <FaTwitterSquare size={32} />
        </TwitterShareButton>

        <EmailShareButton url={link}>
          <FaMailBulk size={32} />
        </EmailShareButton>

        <WhatsappShareButton url={link}>
          <FaWhatsappSquare size={32} />
        </WhatsappShareButton>

        <TelegramShareButton url={link}>
          <FaTelegram size={32} />
        </TelegramShareButton>

        <RedditShareButton url={link}>
          <FaRedditSquare size={32} />
        </RedditShareButton>

        <LinkedinShareButton url={link}>
          <FaLinkedinIn size={32} />
        </LinkedinShareButton>
      </div>
    </ReactModal>
  )
}
