import React, { useEffect, useState } from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { NavLink, Outlet } from 'react-router-dom'
import toast from 'react-simple-toasts'
import { auth } from 'src/features/auth'
import { CurrentUser } from 'src/types'
import './settings.css'

interface UserInfoProps {
  userInfo: CurrentUser
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
      {userInfo?.imageURL && <img src={userInfo.imageURL} className="userImage"></img>}
      <div className="userInfos">
        <div className="userName">{userInfo?.name}</div>
        <div className="userEmail">{userInfo?.email}</div>
      </div>
      <button className="logoutBtn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export const SettingsLayout = () => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const currentUser = {
          name: user?.displayName || '',
          email: user?.email || '',
          imageUrl: user?.photoURL || '',
        }
        setUser(currentUser)
      } else {
        setUser(null)
      }
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
