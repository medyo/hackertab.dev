import AppStorage from '../services/localStorage';
import { LS_ANALYTICS_ID_KEY } from '../Constants';
import { init, track, Identify, identify } from '@amplitude/analytics-browser'
import { ANALYTICS_SDK_KEY, ANALYTICS_ENDPOINT } from '../Constants'

const initAnalytics = () => {
  init(ANALYTICS_SDK_KEY, getRandomUserId(), {
    disableCookies: true,
    serverUrl: ANALYTICS_ENDPOINT,
  })
}
const trackPageScroll = (direction) => {
  trackEvent('Pages', 'Scroll', direction)
}

const trackSearchEngineChange = (searchEngine) => {
  trackEvent('Search', 'Use', searchEngine)
}

const trackSearch = (searchEngine) => {
  trackEvent('Search', 'Submit', searchEngine)
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

const identifyUserLanguages = (languages) => {
  const identity = new Identify()
  identity.set('Languages', languages)
  identify(identity)
}

const identifyListingMode = (listingMode) => {
  const identity = new Identify()
  identity.set('ListingMode', listingMode)
  identify(identity)
}
const identifyUserCards = (cards) => {
  const identity = new Identify()
  identity.set('Sources', cards)
  identify(identity)
}

const identifyUserTheme = (theme) => {
  const identity = new Identify()
  identity.set('Theme', theme)
  identify(identity)
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

const trackCardLanguageChange = (cardName, language) => {
  trackEvent(cardName, 'ChangeLanguage', language)
}

const trackReposDateRangeChange = (dateRange) => {
  trackEvent('Repos', 'ChangeDateRange', dateRange)
}

const trackException = (exceptionMessage, fatal) => {
  if (!process.env.REACT_APP_ANALYTICS_ID) {
    console.log('Missing analytics ID')
    return
  }

  let userId = getRandomUserId()

  const payload = new URLSearchParams([
    ['v', '1'],
    ['type', 'exception'],
    ['exd', exceptionMessage],
    ['exf', fatal === true ? '1' : '0'],
    ['tid', process.env.REACT_APP_ANALYTICS_ID],
    ['cid', userId],
  ])

  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics debug payload', payload.toString())
    return
  }

  navigator.sendBeacon('https://www.google-analytics.com/collect', payload.toString())
}
const getResolution = () => {
  const realWidth = window.screen.width
  const realHeight = window.screen.height
  return `${realWidth}x${realHeight}`
}

const trackEvent = (category, action, label) => {
  if (!process.env.REACT_APP_ANALYTICS_ID) {
    console.log('Missing analytics ID')
    return
  }

  let userId = getRandomUserId()

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

  payload.append('sr', getResolution())

  if (label) {
    payload.append('el', label.capitalize())
  }

  payload.append('cd1', getAppVersion())

  track(`${category.toLowerCase()}_${action.toLowerCase()}`)

  if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics debug payload', payload.toString())
    return
  }

  navigator.sendBeacon('https://www.google-analytics.com/collect', payload.toString())
}

const getAppVersion = () => {
  try {
    var manifestData = chrome.runtime.getManifest()
    return manifestData.version
  } catch (e) {
    return '0.0'
  }
}
/**
 * Generates a random user id
 */
const getRandomUserId = () => {
  let userId = AppStorage.getItem(LS_ANALYTICS_ID_KEY)
  if (!userId) {
    let newUserId = `${new Date().getTime()}${Math.random()}`
    AppStorage.setItem(LS_ANALYTICS_ID_KEY, newUserId)
    userId = newUserId
  }
  return userId
}

Object.assign(String.prototype, {
  capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  },
})

export {
  initAnalytics,
  trackPageView,
  trackThemeChange,
  trackOpenLinkFrom,
  trackAddLanguage,
  trackRemoveLanguage,
  trackAddCard,
  identifyUserLanguages,
  identifyUserCards,
  identifyListingMode,
  identifyUserTheme,
  trackRemoveCard,
  trackOpenLinksNewTab,
  trackBookmarkFrom,
  trackUnbookmarkFrom,
  trackCardLanguageChange,
  trackReposDateRangeChange,
  trackListingModeChange,
  trackPageScroll,
  trackSearch,
  trackSearchEngineChange,
  trackException,
}