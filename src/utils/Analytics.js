import AppStorage from '../services/localStorage';
import { LS_ANALYTICS_ID_KEY } from '../Constants';

const trackPageScroll = (direction) => {
  trackEvent('Pages', 'Scroll', direction)
}

const trackPageView = (pageName) => {
  trackEvent('Pages', 'Open', pageName)
}

const trackThemeChange = (theme) => {
  trackEvent('Theme', 'Apply', theme)
}

const trackOpenLinkFrom = (dataSource) => {
  trackEvent('Link', 'Open', dataSource)
}

const trackListingModeChange = (listingMode) => {
  trackEvent('ListingMode', listingMode)
}

const trackAddLanguage = (language) => {
  trackEvent('Language', 'Add', language)
}

const trackRemoveLanguage = (card) => {
  trackEvent('Language', 'Remove', card)
}

const trackAddCard = (card) => {
  trackEvent('Card', 'Add', card)
}

const trackRemoveCard = (card) => {
  trackEvent('Card', 'Remove', card)
}

const trackOpenLinksNewTab = (enabled) => {
  if (enabled) {
    trackEvent('NewTab', 'Enable')
  } else {
    trackEvent('NewTab', 'Disable')
  }
}

const trackBookmarkFrom = (dataSource) => {
  trackEvent('Bookmarks', 'Add', dataSource)
}

const trackUnbookmarkFrom = (dataSource) => {
  trackEvent('Bookmarks', 'Remove', dataSource)
}

const trackReposLanguageChange = (language) => {
  trackEvent('Repos', 'ChangeLanguage', language)
}

const trackReposDateRangeChange = (dateRange) => {
  trackEvent('Repos', 'ChangeDateRange', dateRange)
}

const trackEvent = (category, action, label) => {
  if (!process.env.REACT_APP_ANALYTICS_ID) {
    console.log('Missing analytics ID')
    return
  }

  let userId = AppStorage.getItem(LS_ANALYTICS_ID_KEY)
  if (!userId) {
    let newUserId = `${new Date().getTime()}${Math.random()}` // Random User Id
    AppStorage.setItem(LS_ANALYTICS_ID_KEY, newUserId)
    userId = newUserId
  }

  const payload = new URLSearchParams([
    ['v', '1'],
    ['t', 'event'],
    ['tid', process.env.REACT_APP_ANALYTICS_ID],
    ['cid', userId],
    ['ec', category],
    ['ea', action],
    ['ul', navigator.language],
    ['ua', navigator.userAgent],
  ])

  if (label) {
    payload.append('el', label.capitalize())
  }

  try {
    var manifestData = chrome.runtime.getManifest()
    payload.append('cd1', manifestData.version)
  } catch (e) {}

  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics debug payload', payload.toString())
    return
  }

  navigator.sendBeacon('https://www.google-analytics.com/collect', payload.toString())
}

Object.assign(String.prototype, {
  capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  },
})

export {
  trackPageView,
  trackThemeChange,
  trackOpenLinkFrom,
  trackAddLanguage,
  trackRemoveLanguage,
  trackAddCard,
  trackRemoveCard,
  trackOpenLinksNewTab,
  trackBookmarkFrom,
  trackUnbookmarkFrom,
  trackReposLanguageChange,
  trackReposDateRangeChange,
  trackListingModeChange,
  trackPageScroll,
}