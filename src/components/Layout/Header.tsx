import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import { BsFillBookmarksFill, BsFillGearFill, BsMoonFill } from 'react-icons/bs'
import { CgTab } from 'react-icons/cg'
import { IoMdSunny } from 'react-icons/io'
import { MdDoDisturbOff } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AvatarPlaceholder from 'src/assets/icons/avatar.svg?react'
import StreakIcon from 'src/assets/icons/fire_icon.svg?react'
import HackertabLogo from 'src/assets/logo.svg?react'
import { SearchBar } from 'src/components/Elements/SearchBar'
import { UserTags } from 'src/components/Elements/UserTags'
import { useAuth } from 'src/features/auth'
import { Changelog } from 'src/features/changelog'
import { identifyUserTheme, trackDNDDisable, trackThemeSelect } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { Button, CircleButton } from '../Elements'
export const Header = () => {
  const { openAuthModal, user, isConnected, isConnecting } = useAuth()

  const [themeIcon, setThemeIcon] = useState(<BsMoonFill />)
  const { theme, setTheme, setDNDDuration, isDNDModeActive } = useUserPreferences()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.documentElement.classList.add(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.replace('dark', theme)
      setThemeIcon(<BsMoonFill />)
    } else if (theme === 'dark') {
      document.documentElement.classList.replace('light', theme)
      setThemeIcon(<IoMdSunny />)
    }
  }, [theme])

  const onThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    trackThemeSelect(newTheme)
    identifyUserTheme(newTheme)
  }

  const onSettingsClick = () => {
    navigate('/settings/general')
  }

  const onUnpauseClicked = () => {
    trackDNDDisable()
    setDNDDuration('never')
  }

  return (
    <>
      <header className="sticky z-[1] mx-[1%] mt-3 mb-0 flex flex-row flex-wrap content-center items-center gap-2.5">
        <span className="order-none flex items-center text-ht-900 md:order-1">
          <i className="relative me-2">
            <CgTab size={24} />
          </i>{' '}
          <Link to="/">
            <HackertabLogo aria-label="hackertab.dev" className="h-4 w-auto fill-ht-900" />
          </Link>
          <Changelog />
        </span>
        <SearchBar />
        <div className="order-none hidden flex-row content-center gap-2 gap-y-2 md:order-3 md:inline-flex">
          {isDNDModeActive() && (
            <Button onClick={onUnpauseClicked} className="font-bold">
              <MdDoDisturbOff />
              Unpause
            </Button>
          )}

          <CircleButton onClick={onSettingsClick}>
            <BsFillGearFill />
          </CircleButton>
          <CircleButton onClick={onThemeChange} variant="darkfocus">
            {themeIcon}
          </CircleButton>
          <CircleButton onClick={() => navigate('/settings/bookmarks')}>
            <BsFillBookmarksFill />
          </CircleButton>
          <CircleButton
            isLoading={isConnecting}
            className={clsx('relative', !isConnected && 'overflow-hidden')}
            onClick={() => {
              if (isConnected) {
                navigate('/settings/general')
              } else {
                openAuthModal()
              }
            }}>
            {isConnected ? (
              <>
                <img
                  className="size-full rounded-full outline-2 outline-amber-600"
                  src={user?.imageURL}
                />
                <div className="absolute right-0 -bottom-2 left-0 inline-block">
                  <span className="inline-flex items-center justify-center rounded-xl bg-amber-500 py-px ps-6 pe-1.5 text-xs outline-2 outline-ht-100">
                    <StreakIcon className="absolute -top-0.5 left-0 w-6" /> {user?.streak || 1}
                  </span>
                </div>
              </>
            ) : (
              <AvatarPlaceholder className="size-full scale-85 rounded-full" />
            )}
          </CircleButton>
        </div>
        {location.pathname === '/' && <UserTags />}
      </header>
    </>
  )
}
