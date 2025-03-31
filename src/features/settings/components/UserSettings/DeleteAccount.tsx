import { useState } from 'react'
import toast from 'react-simple-toasts'
import { Button, ConfirmModal } from 'src/components/Elements'
import { useAuth } from 'src/features/auth'
import { useDeleteAccount } from 'src/features/auth/api/deleteAccount'
import { trackUserDelete } from 'src/lib/analytics'

export const DeleteAccount = () => {
  const deleteAccountMutation = useDeleteAccount()
  const { user, logout } = useAuth()
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!user) {
    return null
  }

  const onDeleteAccount = () => {
    deleteAccountMutation
      .mutateAsync({
        userId: user.id,
      })
      .then(() => {
        logout()
        trackUserDelete()
        toast('Account deleted successfully', { theme: 'successToast' })
      })
      .catch(() => {
        toast('Failed to delete account', { theme: 'defaultToast' })
      })
  }

  return (
    <div className="settingRow">
      <p className="settingTitle">
        Delete account?
        <br />
        <span className="settingHint">
          This action is irreversible and will delete all your data. Proceed with caution.
        </span>
      </p>
      <div className="settingContent">
        <ConfirmModal
          showModal={confirmDelete}
          title="Confirm delete account"
          description="Are you sure you want to delete your account? This action is irreversible and will delete all your data including your streaks and settings."
          onClose={() => setConfirmDelete(false)}
          onConfirm={onDeleteAccount}
        />

        <Button
          size="small"
          onClick={() => setConfirmDelete(true)}
          isLoading={deleteAccountMutation.isLoading}>
          Delete account
        </Button>
      </div>
    </div>
  )
}
