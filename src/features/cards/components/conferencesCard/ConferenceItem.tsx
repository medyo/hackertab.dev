import { Menu, MenuItem } from '@szhsin/react-menu'
import { flag } from 'country-emoji'
import { useMemo } from 'react'
import { IoIosPin } from 'react-icons/io'
import { LiaCalendarPlus } from 'react-icons/lia'
import { MdAccessTime } from 'react-icons/md'
import { CardItemWithActions, CardLink, ColoredLanguagesBadge } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { BaseItemPropsType, Conference } from 'src/types'
import { CALENDAR_PROVIDERS } from '../../config'

const ConferencesItem = ({ item, analyticsTag }: BaseItemPropsType<Conference>) => {
  const { listingMode } = useUserPreferences()

  const conferenceLocation = useMemo(() => {
    if (item.online) {
      return {
        icon: '🌐',
        label: 'Online',
      }
    }
    if (item.country) {
      return {
        icon: flag(item.country.replace(/[^a-zA-Z ]/g, '')) || '🏳️',
        country: item.country,
        label: item.city,
      }
    }
    return null
  }, [item.online, item.country, item.city])

  const conferenceDate = useMemo(() => {
    if (!item.start_date) {
      return ''
    }
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const startDate = new Date(item.start_date)
    const startMnth = monthNames[startDate.getMonth()]
    let value = `${startMnth} ${('0' + startDate.getDate()).slice(-2)}`
    if (!item.end_date || item.end_date === item.start_date) {
      return value
    }
    const endDate = new Date(item.end_date)
    let endValue = ('0' + endDate.getDate()).slice(-2)
    if (endDate.getMonth() !== startDate.getMonth()) {
      endValue = `${monthNames[endDate.getMonth()]} ${endValue}`
    }
    return `${value} - ${endValue}`
  }, [item.start_date, item.end_date])

  const differenceInDays = useMemo(() => {
    if (!item.start_date) {
      return 0
    }
    const startDate = new Date(item.start_date)
    const currentDate = new Date()
    const diffTime = startDate.getTime() - currentDate.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }, [item.start_date])

  const calendarProvidersMenu = useMemo(() => {
    return Object.entries(CALENDAR_PROVIDERS).map(([key, { Logo, name, addToCalendar }]) => {
      const startDate =
        new Date(item.start_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      const endDate = new Date(item.end_date).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
      const location = conferenceLocation
        ? `${conferenceLocation.country ? `${conferenceLocation.country}-` : ''}${
            conferenceLocation.label
          }`
        : ''
      return (
        <MenuItem
          key={key}
          className={`menuItem`}
          onClick={() => {
            addToCalendar({
              title: `${item.title}, ${conferenceLocation?.label || ''}`,
              startDate,
              endDate,
              description: `Find out more at ${item.url}.\nThis event was added via Hackertab.dev`,
              location: location,
            })
          }}>
          <Logo className="calendarProviderIcon" /> Add to {name}
        </MenuItem>
      )
    })
  }, [])

  return (
    <CardItemWithActions
      source={analyticsTag}
      item={item}
      showBookmarkAction={false}
      customActions={[
        {
          label: 'Add to Calendar',
          Component: (
            <Menu
              menuButton={
                <div className={`blockActionButton`}>
                  <LiaCalendarPlus />
                </div>
              }
              theming="dark"
              portal={true}
              transition
              className={`menuItem`}
              direction={'bottom'}
              align="start">
              {calendarProvidersMenu}
            </Menu>
          ),
        },
      ]}
      cardItem={
        <>
          <CardLink
            link={item.url}
            analyticsAttributes={{
              [Attributes.TRIGERED_FROM]: 'card',
              [Attributes.TITLE]: item.title,
              [Attributes.LINK]: item.url,
              [Attributes.SOURCE]: analyticsTag,
            }}>
            <div className="subTitle">
              {differenceInDays < 0 && <span className="blockHeaderBadge past">Ended</span>}{' '}
              <span className="rowTitleIcon">{conferenceLocation?.icon}</span>
              {item.title}
            </div>
          </CardLink>
          {listingMode === 'normal' ? (
            <>
              <div className="rowDescription">
                <span className="rowItem">
                  <IoIosPin className="rowItemIcon" /> {conferenceLocation?.label}
                </span>
                <span className="rowItem">
                  <MdAccessTime className="rowItemIcon" /> {` `}
                  {differenceInDays > 0
                    ? `In ${differenceInDays} days, ${conferenceDate}`
                    : differenceInDays === 0
                    ? `Ongoing, ${conferenceDate}`
                    : `${conferenceDate}`}
                </span>
                <span className="rowItem">
                  <ColoredLanguagesBadge languages={item.tags} />
                </span>
              </div>
            </>
          ) : (
            <div className="rowDescription">
              <span className="rowItem">
                <MdAccessTime className="rowItemIcon" /> {conferenceDate}
              </span>
            </div>
          )}
        </>
      }
    />
  )
}

export default ConferencesItem
