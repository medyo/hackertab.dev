import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { NavLink, Outlet } from 'react-router-dom'
import { User } from 'src/features/auth/types'
import { useAuth } from 'src/stores/user'
import './settings.css'

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
      <button className="logoutBtn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export const SettingsLayout = () => {
  const { user } = useAuth()
  const navigation = [
    {
      name: 'Topics',
      path: '/settings/topics',
    },
    {
      name: 'Sources',
      path: '/settings/sources',
    },
    {
      name: 'Bookmarks',
      path: '/settings/bookmarks',
    },
    {
      name: 'Search Engine',
      path: '/settings/search-engine',
    },
    {
      name: 'Settings',
      path: '/settings/general',
    },
  ]
  return (
    <div className="settings">
      {user != null && <UserInfo user={user} />}
      <div className="horizontalTabsLayout">
        <nav className="navigation">
          {navigation.map((item) => {
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 'link ' + (isActive ? 'active' : '')}>
                {item.name}
              </NavLink>
            )
          })}
        </nav>

        <div className="content">
          <React.Suspense fallback={<></>}>
            <Outlet />
          </React.Suspense>
        </div>
      </div>
    </div>
  )
}
