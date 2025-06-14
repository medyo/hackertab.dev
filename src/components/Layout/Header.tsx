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
      <header className="sticky top-0 z-[1] mx-[1%] mt-[10px] mb-0 flex flex-row flex-wrap content-center items-center gap-[10px] md:h-auto">
        <span className="flex items-center pt-[4px] md:w-auto md:grow-0">
          <i className="me-[8px]">
            <CgTab size={24} />
          </i>{' '}
          <Link to="/">
            <HackertabLogo aria-label="hackertab.dev" className="h-[16px] w-auto fill-ht-900" />
          </Link>
          <Changelog />
        </span>
        <SearchBar />
        <div className="inline-flex flex-row items-center gap-[8px]">
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
                  className="size-[40px] rounded-full outline-2 outline-amber-600"
                  src={user?.imageURL}
                />
                <div className="absolute mr-0 -mb-12 ml-0 inline-block">
                  <div className="flex items-center justify-end rounded-[12px] border-2 border-ht-100 bg-amber-600 text-[11px] font-bold text-white">
                    <StreakIcon className="-mt-[2px] ml-0 w-[2.2em]" />{' '}
                    <span className="me-2 justify-self-end">{user?.streak || 1}</span>
                  </div>
                </div>
              </>
            ) : (
              <AvatarPlaceholder className="mt-[10px] size-[34px] rounded-[20px]" />
            )}
          </CircleButton>
        </div>
        {location.pathname === '/' && <UserTags />}
      </header>
    </>
  )
}
