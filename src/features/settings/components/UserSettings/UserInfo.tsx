import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { IoCheckmarkOutline } from 'react-icons/io5'
import AvatarPlaceholder from 'src/assets/icons/avatar.svg?react'
import StreakIcon from 'src/assets/icons/fire_icon.svg?react'
import { Button, ConfirmModal } from 'src/components/Elements'
import { useAuth } from 'src/features/auth'
import { pluralize } from 'src/utils/String'

export const UserInfo = () => {
  const { user } = useAuth()
  const { logout, providerId, openAuthModal } = useAuth()
  const providerName = providerId?.split('.')[0] || 'Unknown'
  const [showLogout, setShowLogout] = useState(false)

  if (!user) {
    return (
      <div className="userContent">
        <AvatarPlaceholder className="userImage" />
        <div className="userInfos">
          <div className="userName">
            Join <b>Hackertab</b>
          </div>
          <div className="sub">
            Create a free account on <b>Hackertab</b> to sync, save bookmarks, and earn rewards.
          </div>
          <div className="actions">
            <Button className="logoutBtn" onClick={() => openAuthModal()} size="small">
              Connect
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="userContent">
      <ConfirmModal
        showModal={showLogout}
        title="Confirm logout"
        description="Are you sure you want to logout?"
        onClose={() => setShowLogout(false)}
        onConfirm={logout}
      />

      <div className="userDetails">
        {user?.imageURL && <img src={user.imageURL} className="userImage"></img>}
        <div className="userInfo">
          <div className="userName">{user.name}</div>
          <div className="sub">
            {providerId == 'github.com' ? (
              <FaGithub size={18} />
            ) : providerId == 'google.com' ? (
              <FcGoogle size={18} />
            ) : null}
            Connected with <span className="capitalize">{providerName}</span>
          </div>
          <div className="actions">
            <Button className="logoutBtn" onClick={() => setShowLogout(true)} size="small">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="streaks">
        <p className="title">
          You're on{' '}
          <span className="highlight">
            <StreakIcon className="icon" /> {pluralize(user.streak || 1, 'day')} streak
          </span>
        </p>
        <div>
          <ul className="streaksWeek">
            {Array.from({ length: 5 }, (_, i) => {
              const streak = user.streak || 1
              if (i < streak) {
                return (
                  <li key={`day-${i}`} className="dayWrapper checked">
                    <span className="day">
                      <IoCheckmarkOutline />
                    </span>
                  </li>
                )
              } else {
                return (
                  <li key={`day-${i}`} className="dayWrapper">
                    <span className="day"></span>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
