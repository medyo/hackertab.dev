import React from 'react'
import 'react-contexify/dist/ReactContexify.css'
import { NavLink, Outlet } from 'react-router-dom'
import './settings.css'

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
      name: 'Settings',
      path: '/settings/general',
    },
  ]
  return (
    <div className="settings">
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
