import { Menu, MenuDivider, MenuItem, SubMenu } from '@szhsin/react-menu'
import { useCallback, useMemo } from 'react'
import { AiOutlineCode } from 'react-icons/ai'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { GoGear } from 'react-icons/go'
import { IoTrashBinOutline } from 'react-icons/io5'
import { LiaSortSolid } from 'react-icons/lia'
import { MdDateRange } from 'react-icons/md'
import { ref } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'

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

export const CardSettings = ({
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
  const userSelectedTags = useUserPreferences((state) => state.userSelectedTags)
  const openLinksNewTab = useUserPreferences((state) => state.openLinksNewTab)
  const removeCard = useUserPreferences((state) => state.removeCard)
  const setCardSettings = useUserPreferences((state) => state.setCardSettings)
  const cardSettings = useUserPreferences((state) => state.cardsSettings[id])

  const userTagsMemo = useMemo(() => {
    const newTags = userSelectedTags.sort((a, b) => a.label.localeCompare(b.label))
    if (globalTag) {
      return [globalTag, ...newTags]
    }
    return newTags
  }, [userSelectedTags, globalTag])

  const resolvedSortOptions =
    typeof sortOptions === 'function'
      ? sortOptions(DEFAULT_SORT_OPTIONS)
      : sortOptions || DEFAULT_SORT_OPTIONS

  const onOpenSourceUrlClicked = useCallback(() => {
    let link = `${url}?${ref}`
    window.open(link, openLinksNewTab ? '_blank' : '_self')
  }, [url, openLinksNewTab])

  return (
    <Menu
      menuButton={<GoGear />}
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
          {userTagsMemo.map((tag) => (
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
