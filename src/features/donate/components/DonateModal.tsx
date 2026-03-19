import ReactModal from 'react-modal'
import { DonateView } from './DonateView'
import './donate.css'

type DonateModalProps = {
  setModalOpen: (open: boolean) => void
}
export const DonateModal = ({ setModalOpen }: DonateModalProps) => {
  return (
    <ReactModal
      isOpen={true}
      ariaHideApp={false}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={false}
      shouldFocusAfterRender={false}
      className="Modal scrollable donateModal"
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <DonateView setModalOpen={setModalOpen} />
    </ReactModal>
  )
}
