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
          <input type="text" className="link" value={data.link} disabled />
          <button className="copy" onClick={copyLink}>
            <VscCopy />
          </button>
        </div>
      </div>

      <div className="shareOptions">
        <FacebookShareButton url={data.link}>
          <FaFacebookSquare size={32} />
        </FacebookShareButton>

        <TwitterShareButton url={data.link}>
          <FaTwitterSquare size={32} />
        </TwitterShareButton>

        <EmailShareButton url={data.link}>
          <FaMailBulk size={32} />
        </EmailShareButton>

        <WhatsappShareButton url={data.link}>
          <FaWhatsappSquare size={32} />
        </WhatsappShareButton>

        <TelegramShareButton url={data.link}>
          <FaTelegram size={32} />
        </TelegramShareButton>

        <RedditShareButton url={data.link}>
          <FaRedditSquare size={32} />
        </RedditShareButton>

        <LinkedinShareButton url={data.link}>
          <FaLinkedinIn size={32} />
        </LinkedinShareButton>
      </div>
    </ReactModal>
  )
}
