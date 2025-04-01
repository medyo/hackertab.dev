import clsx from 'clsx'
import { VscClose } from 'react-icons/vsc'
import ReactModal from 'react-modal'
type ModalProps = {
  showModal: boolean
  onClose: () => void
  className?: string
  header: {
    title: string
    className?: string
    icon?: React.ReactNode
  }
  children: React.ReactNode
}
export const Modal = ({ showModal, className, header, onClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={showModal}
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldFocusAfterRender={false}
      onRequestClose={onClose}
      className={clsx('Modal', className)}
      style={{
        overlay: {
          zIndex: 3,
        },
      }}
      overlayClassName="Overlay">
      <div>
        <header className="modalHeader">
          <h1 className={clsx('modalTitle', header.className)}>
            {header.icon}
            {header.title}
          </h1>
          <button
            className="modalCloseBtn"
            onClick={() => onClose()}
            aria-label="Close share modal">
            <VscClose size="24" />
          </button>
        </header>

        {children}
      </div>
    </ReactModal>
  )
}
