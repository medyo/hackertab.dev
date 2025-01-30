import { User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { NavLink, Outlet } from 'react-router-dom'
import toast from 'react-simple-toasts'
import { auth } from 'src/features/auth'
import './settings.css'

interface UserInfoProps {
  userInfo: User // Define the type of userInfo
}

const UserInfo = ({ userInfo }: UserInfoProps) => {
  const logout = () => {
    auth
      .signOut()
      .then((result) => {
        toast('Account logged out successfuly', { theme: 'defaultToast' })
      })
      .catch((error) => {
        toast('Failed to logged out, please try later !!', { theme: 'failure' })
      })
  }
  return (
    <div className="userCard">
      {userInfo?.photoURL && <img src={userInfo.photoURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{userInfo?.displayName}</div>
        <div className="userEmail">{userInfo?.email}</div>
      </div>
      <button className="logoutBtn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export const SettingsLayout = () => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => unsubscribe()
  })
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
      {user != null && <UserInfo userInfo={user} />}
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
