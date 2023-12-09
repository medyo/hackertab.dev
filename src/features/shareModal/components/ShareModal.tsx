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
import { twitterHandle } from 'src/config'
import { trackLinkCopy, trackLinkShare } from 'src/lib/analytics'
import { ShareModalData } from '../types'
import './share.css'

type ShareModalProps = {
  showModal: boolean
  closeModal: () => void
  shareData: ShareModalData | undefined
}

const sharingButtons = [
  { component: EmailShareButton, icon: EmailIcon, name: 'email' },
  { component: FacebookShareButton, icon: FacebookIcon, name: 'facebook' },
  {
    component: TwitterShareButton,
    icon: TwitterIcon,
    name: 'twitter',
    body: `via ${twitterHandle}`,
  },
  { component: RedditShareButton, icon: RedditIcon, name: 'reddit' },
  { component: LinkedinShareButton, icon: LinkedinIcon, name: 'linkedin' },
  { component: TelegramShareButton, icon: TelegramIcon, name: 'telegram' },
  { component: WhatsappShareButton, icon: WhatsappIcon, name: 'whatsapp' },
]

export const ShareModal = ({ showModal, closeModal, shareData }: ShareModalProps) => {
  if (!shareData) {
    return null
  }

  const { title, link, source } = shareData

  const onCopyClicked = () => {
    navigator.clipboard.writeText(shareData.link)
    trackLinkCopy({
      ...shareData,
    })
    toast('Link copied to clipboard', { theme: 'defaultToast' })
  }

  const onSocialMediaClicked = (provider: string) => {
    trackLinkShare({
      ...shareData,
      provider,
    })
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
        <p className="source">{source}</p>
        <h3 className="title">{title}</h3>
        <a className="link" href={link} target="_blank">
          {link}
        </a>
      </div>

      <div className="shareOptions">
        <h3>Share via</h3>
        <div className="shareButtons">
          {sharingButtons.map(({ component: ShareButton, body, icon: Icon, name }, index) => (
            <ShareButton
              key={index}
              url={link}
              title={!body ? title : `${title} ${body}`}
              onClick={() => onSocialMediaClicked(name)}>
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
