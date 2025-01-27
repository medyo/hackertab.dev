import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { NavLink, Outlet } from 'react-router-dom'
import { auth } from '../../../features/auth/api/Config'
import './settings.css'

const UserInfo = () => {
  const userInfo = auth.currentUser
  return (
    <div className="userCard">
      {userInfo?.photoURL && <img src={userInfo.photoURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{userInfo?.displayName}</div>
        <div className="userEmail">{userInfo?.email}</div>
      </div>
    </div>
  )
}

export const SettingsLayout = () => {
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
      <UserInfo />
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
