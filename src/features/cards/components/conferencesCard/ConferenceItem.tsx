import { CardLink, CardItemWithActions } from 'src/components/Elements'
import { Attributes } from 'src/lib/analytics'
import { BaseItemPropsType, Conference } from 'src/types'
import { MdAccessTime } from 'react-icons/md'
import { ColoredLanguagesBadge } from 'src/components/Elements'
import { flag } from 'country-emoji'
import { IoIosPin } from 'react-icons/io'
import { RiCalendarEventFill } from 'react-icons/ri'
import { useUserPreferences } from 'src/stores/preferences'

const ConferencesItem = ({ item, index, analyticsTag }: BaseItemPropsType<Conference>) => {
  const { listingMode } = useUserPreferences()

  const ConferenceLocation = () => {
    if (item.online) {
      return '🌐 Online'
    }
    if (item.country) {
      return `${flag(item.country.replace(/[^a-zA-Z ]/g, ''))} ${item.city}`
    }
  }

  const ConferenceDate = () => {
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
  }
  return (
    <CardItemWithActions
      source={analyticsTag}
      index={index}
      key={index}
      item={item}
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
            <RiCalendarEventFill className={'rowTitleIcon'} />
            {item.title}
          </CardLink>
          {listingMode === 'normal' ? (
            <>
              <div className="rowDescription">
                <span className="rowItem">
                  <IoIosPin className="rowItemIcon" /> {ConferenceLocation()}
                </span>
                <span className="rowItem">
                  <MdAccessTime className="rowItemIcon" /> {ConferenceDate()}
                </span>
              </div>
              <div className="rowDetails">
                <ColoredLanguagesBadge languages={[item.tag]} />
              </div>
            </>
          ) : (
            <div className="rowDescription">
              <span className="rowItem">
                <MdAccessTime className="rowItemIcon" /> {ConferenceDate()}
              </span>
            </div>
          )}
        </>
      }
    />
  )
}

export default ConferencesItem
