import { Menu, MenuDivider, MenuItem, SubMenu } from '@szhsin/react-menu'
import { memo, useCallback, useMemo } from 'react'
import { AiOutlineCode } from 'react-icons/ai'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { FiFilter } from 'react-icons/fi'
import { GoGear } from 'react-icons/go'
import { IoTrashBinOutline } from 'react-icons/io5'
import { LiaSortSolid } from 'react-icons/lia'
import { MdDateRange } from 'react-icons/md'
import { useMediaQuery } from 'react-responsive'
import { ref } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { useShallow } from 'zustand/shallow'
import { MY_LANGUAGES_OPTION } from '../config'

type SortOption = { label: string; value: string; icon?: React.ReactNode }

type CardSettingsProps = {
  url?: string
  id: string
  sortBy?: string
  globalTag?: { label: string; value: string }
  language?: string
  showLanguageFilter?: boolean
  showDateRangeFilter?: boolean
  customStartMenuItems?: React.ReactNode
  sortOptions?: ((defaults: SortOption[]) => SortOption[]) | SortOption[]
}

const DEFAULT_SORT_OPTIONS = [{ label: 'Newest', value: 'published_at', icon: <MdDateRange /> }]
const SPECIAL_LABELS = ['global', MY_LANGUAGES_OPTION.label.toLowerCase()]

const CardSettings = ({
  id,
  url,
  sortBy,
  globalTag,
  language,
  showLanguageFilter = true,
  showDateRangeFilter = true,
  customStartMenuItems,
  sortOptions,
}: CardSettingsProps) => {
  const { userSelectedTags, openLinksNewTab, removeCard, setCardSettings, cardSettings } =
    useUserPreferences(
      useShallow((state) => ({
        userSelectedTags: state.userSelectedTags,
        openLinksNewTab: state.openLinksNewTab,
        removeCard: state.removeCard,
        setCardSettings: state.setCardSettings,
        cardSettings: state.cardsSettings?.[id],
      }))
    )

  const userTagsMemo = useMemo(() => {
    const tags = [...userSelectedTags]
      .sort((a, b) => a.label.localeCompare(b.label))
      .concat(globalTag ? [globalTag] : [])
      .concat(MY_LANGUAGES_OPTION)
    return tags
  }, [userSelectedTags, globalTag])

  const resolvedSortOptions = useMemo(() => {
    return typeof sortOptions === 'function'
      ? sortOptions(DEFAULT_SORT_OPTIONS)
      : sortOptions || DEFAULT_SORT_OPTIONS
  }, [sortOptions])

  const onOpenSourceUrlClicked = useCallback(() => {
    if (!url) return
    const link = `${url}?${ref}`
    window.open(link, openLinksNewTab ? '_blank' : '_self')
  }, [url, openLinksNewTab])

  const firstSpecialIndex = useMemo(
    () => userTagsMemo.findIndex((tag) => SPECIAL_LABELS.includes(tag.label.toLowerCase())),
    [userTagsMemo]
  )

  const isMobile = useMediaQuery({ maxWidth: 767 })
  const menuIcon = isMobile ? <FiFilter /> : <GoGear />

  return (
    <Menu
      menuButton={menuIcon}
      theming="dark"
      portal={true}
      className={`menuItem`}
      transition
      direction={'bottom'}
      align="start">
      {customStartMenuItems}
      {showLanguageFilter && userTagsMemo.length > 0 && (
        <SubMenu
          label={
            <span className={`menuItem`}>
              <AiOutlineCode /> Language
            </span>
          }>
          {userTagsMemo.map((tag, i) => (
            <>
              {i === firstSpecialIndex && <MenuDivider />}
              <MenuItem
                className={`menuItem`}
                type="radio"
                value={tag.value}
                key={tag.value}
                disabled={language === tag.value}
                onClick={() => {
                  setCardSettings(id, { ...cardSettings, language: tag.value })
                }}>
                {tag.label}
              </MenuItem>
            </>
          ))}
        </SubMenu>
      )}

      {showDateRangeFilter && (
        <SubMenu
          className="subMenuItem"
          label={
            <span className={`menuItem`}>
              <LiaSortSolid />
              Sort by
            </span>
          }>
          {resolvedSortOptions.map((option) => (
            <MenuItem
              className={`menuItem`}
              key={option.value}
              disabled={sortBy === option.value}
              onClick={() => {
                setCardSettings(id, { ...cardSettings, sortBy: option.value })
              }}>
              {option.icon} {option.label}
            </MenuItem>
          ))}
        </SubMenu>
      )}
      {(showDateRangeFilter || showLanguageFilter) && <MenuDivider />}
      <MenuItem
        className={`menuItem`}
        onClick={() => {
          removeCard(id)
        }}>
        <IoTrashBinOutline />
        Remove card
      </MenuItem>
      <MenuItem className={`menuItem`} onClick={onOpenSourceUrlClicked} disabled={!url}>
        <BsBoxArrowInUpRight />
        Open in new tab
      </MenuItem>
    </Menu>
  )
}

export const MemoizedCardSettings = memo(CardSettings)
