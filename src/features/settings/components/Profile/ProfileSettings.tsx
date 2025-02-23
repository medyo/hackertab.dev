import { useAuth, User } from 'src/features/auth'
import './profileSettings.css'

interface UserInfoProps {
  user: User
}

const UserInfo = ({ user }: UserInfoProps) => {
  const { logout } = useAuth()

  return (
    <div className="userCard">
      {user?.imageURL && <img src={user.imageURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{user.name}</div>
        <div className="userEmail">{user?.email}</div>
      </div>
      <div className="actions">
        <button className="logoutBtn" onClick={logout}>
          Logout
        </button>
        <button className="logoutBtn" onClick={() => {}}>
          Delete account
        </button>
      </div>
    </div>
  )
}

export const ProfileSettings = () => {
  const { user } = useAuth()
  return <div className="profile">{user != null && <UserInfo user={user} />}</div>
}
