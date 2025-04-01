import { Button, Modal } from 'src/components/Elements'
import './confirmModal.css'

interface LogoutModalProps {
  showModal: boolean
  title: string
  description: string
  onClose: () => void
  onConfirm: () => void
}

export const ConfirmModal = ({
  showModal,
  title,
  description,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  return (
    <Modal
      showModal={showModal}
      onClose={onClose}
      header={{
        title: title,
        className: undefined,
        icon: undefined,
      }}
      className="confirmModal">
      <div className="content">
        <p className="description">{description}</p>
        <div className="buttons">
          <Button onClick={onClose} size="medium">
            Cancel
          </Button>
          <Button onClick={onConfirm} size="medium">
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}
