export const MY_LANGUAGES_OPTION = { label: 'My Stack', value: 'myLangs' }

import AppleCalendarLogo from 'src/assets/calendar_icons/apple.svg?react'
import GoogleCalendarLogo from 'src/assets/calendar_icons/google.svg?react'
import OutlookCalendarLogo from 'src/assets/calendar_icons/outlook.svg?react'
import YahooCalendarLogo from 'src/assets/calendar_icons/yahoo.svg?react'
import { encode } from 'src/utils/UrlUtils'
import { openCalendarUrl } from '../utils/url'

type CalendarProviderPayload = {
  title: string
  startDate: string
  endDate: string
  description: string
  location: string
}

export const CALENDAR_PROVIDERS = {
  google: {
    name: 'Google Calendar',
    Logo: GoogleCalendarLogo,
    addToCalendar({ title, startDate, endDate, description, location }: CalendarProviderPayload) {
      openCalendarUrl(
        'https://calendar.google.com/calendar/render?action=TEMPLATE' +
          `&text=${encode(title)}` +
          `&dates=${startDate}/${endDate}` +
          `&details=${encode(description)}` +
          `&location=${encode(location)}`
      )
    },
  },

  outlook: {
    name: 'Outlook Calendar',
    Logo: OutlookCalendarLogo,
    addToCalendar({ title, startDate, endDate, description, location }: CalendarProviderPayload) {
      openCalendarUrl(
        'https://outlook.live.com/calendar/0/deeplink/compose' +
          `?subject=${encode(title)}` +
          `&startdt=${startDate}` +
          `&enddt=${endDate}` +
          `&body=${encode(description)}` +
          `&location=${encode(location)}`
      )
    },
  },

  yahoo: {
    name: 'Yahoo Calendar',
    Logo: YahooCalendarLogo,
    addToCalendar({ title, startDate, endDate, description, location }: CalendarProviderPayload) {
      openCalendarUrl(
        'https://calendar.yahoo.com/?v=60' +
          `&title=${encode(title)}` +
          `&st=${startDate}` +
          `&et=${endDate}` +
          `&desc=${encode(description)}` +
          `&in_loc=${encode(location)}`
      )
    },
  },

  apple: {
    name: 'Apple Calendar',
    Logo: AppleCalendarLogo,
    addToCalendar({ title, startDate, endDate, description, location }: CalendarProviderPayload) {
      const ics = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${startDate}
DTEND:${endDate}
END:VEVENT
END:VCALENDAR
`.trim()

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'event.ics'
      a.click()

      URL.revokeObjectURL(url)
    },
  },
}
