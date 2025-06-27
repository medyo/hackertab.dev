import { identify, Identify, init, track } from '@amplitude/analytics-browser'
import { ANALYTICS_ENDPOINT, ANALYTICS_SDK_KEY, LS_ANALYTICS_ID_KEY } from 'src/config'
import { useUserPreferences } from 'src/stores/preferences'
import { isDevelopment } from 'src/utils/Environment'
import { getAppVersion } from 'src/utils/Os'
import AppStorage from './localStorage'

enum Objects {
  PAGE = 'Page',
  LANGUAGE = 'Language',
  SOURCE = 'Source',
  USER = 'User',
  THEME = 'Theme',
  LINK = 'Link',
  TAB = 'Tab',
  CARD = 'Card',
  SEARCH_ENGINE = 'Search Engine',
  LISTING_MODE = 'Listing Mode',
  CHANGE_LOG = 'Change Log',
  MARKETING_CAMPAIGN = 'Marketing Campaign',
  ONBOARDING = 'Onboarding',
  RSS = 'Rss',
  DO_NOT_DISTURB = 'DND',
  DISPLAY_LAYOUT = 'Display Layout',
  FEED = 'Feed',
}

enum Verbs {
  VIEW = 'View',
  SCROLL = 'Scroll',
  SEARCH = 'Search',
  SELECT = 'Select',
  ADD = 'Add',
  OPEN = 'Open',
  CLOSE = 'Close',
  TARGET = 'Target',
  BOOKMARK = 'Bookmark',
  UNBOOKMARK = 'Unbookmark',
  REMOVE = 'Remove',
  START = 'Start',
  FINISH = 'Finish',
  SKIP = 'Skip',
  DRAG = 'Drag',
  CHANGE = 'Change',
  ENABLE = 'Enable',
  DISABLE = 'Disable',
  SHARE = 'Share',
  COPY = 'Copy',
  CONNECT = 'Connect',
  DISCONNECT = 'Disconnect',
  DELETE = 'Delete',
}

export enum Attributes {
  PAGE_NAME = 'Page Name',
  DIRECTION = 'Direction',
  SEARCH_ENGINE = 'Search Engine',
  THEME = 'Theme',
  LANGUAGE = 'Language',
  LANGUAGES = 'Languages',
  DATE_RANGE = 'Date Range',
  SOURCE = 'Source',
  SOURCES = 'Sources',
  LISTING_MODE = 'Listing Mode',
  TARGET = 'Target',
  RESOLUTION = 'Screen Resolution',
  POINTS = 'Points',
  TRIGERED_FROM = 'Trigered From',
  TITLE = 'Title',
  LINK = 'Link',
  SOURCE_TAGS = 'Source Tags',
  CAMPAIGN_ID = 'Campaign Id',
  OCCUPATION = 'Occupation',
  MAX_VISIBLE_CARDS = 'Max Visible Cards',
  DURATION = 'Duration',
  PROVIDER = 'Provider',
  ADV = 'ADV',
  STREAK = 'Streak',
  DISPLAY_LAYOUT = 'Display Layout',
}

const _SEP_ = ' '

export const setupAnalytics = () => {
  if (!ANALYTICS_SDK_KEY) {
    console.warn('Analytics SDK key not found')
    return
  }

  init(ANALYTICS_SDK_KEY, getRandomUserId(), {
    disableCookies: true,
    serverUrl: ANALYTICS_ENDPOINT,
    appVersion: getAppVersion() || '0.0.0',
    useBatch: false,
  })
}

export const setupIdentification = () => {
  const {
    userSelectedTags,
    onboardingResult,
    theme,
    cards,
    listingMode,
    openLinksNewTab,
    promptEngine,
    maxVisibleCards,
    layout,
  } = useUserPreferences.getState()

  identifyUserProperty(Attributes.RESOLUTION, getScreenResolution())
  identifyUserLanguages(userSelectedTags.map((tag: any) => tag.value))
  identifyUserTheme(theme)
  identifyUserCards(cards.map((card: any) => card.name))
  identifyUserListingMode(listingMode)
  identifyUserSearchEngine(promptEngine)
  identifyUserLinksInNewTab(openLinksNewTab)
  identifyUserMaxVisibleCards(maxVisibleCards)
  identifyDisplayLayout(layout)
  if (onboardingResult?.title) {
    identifyUserOccupation(onboardingResult.title)
  }
}

export const trackPageView = (pageName: string, dndModeActive: boolean = false) => {
  trackEvent({
    object: Objects.PAGE,
    verb: Verbs.VIEW,
    attributes: {
      [Attributes.PAGE_NAME]: pageName,
      [Objects.DO_NOT_DISTURB]: dndModeActive ? 'on' : 'off',
    },
  })
}

export const trackPageScroll = (direction: 'left' | 'right') => {
  trackEvent({
    object: Objects.PAGE,
    verb: Verbs.SCROLL,
    attributes: { [Attributes.DIRECTION]: direction },
  })
}

export const trackSearchEngineUse = (searchEngineName: string) => {
  trackEvent({
    object: Objects.SEARCH_ENGINE,
    verb: Verbs.SEARCH,
    attributes: { [Attributes.SEARCH_ENGINE]: searchEngineName },
  })
}

export const trackSearchEngineSelect = (searchEngineName: string) => {
  trackEvent({
    object: Objects.SEARCH_ENGINE,
    verb: Verbs.SELECT,
    attributes: { [Attributes.SEARCH_ENGINE]: searchEngineName },
  })
}

export const trackThemeSelect = (theme: 'dark' | 'light') => {
  trackEvent({
    object: Objects.THEME,
    verb: Verbs.SELECT,
    attributes: { [Attributes.THEME]: theme },
  })
}

export const trackLanguageAdd = (languageName: string) => {
  trackEvent({
    object: Objects.LANGUAGE,
    verb: Verbs.ADD,
    attributes: { [Attributes.LANGUAGE]: languageName },
  })
}

export const trackLanguageRemove = (languageName: string) => {
  trackEvent({
    object: Objects.LANGUAGE,
    verb: Verbs.REMOVE,
    attributes: { [Attributes.LANGUAGE]: languageName },
  })
}

export const trackSourceAdd = (sourceName: string) => {
  trackEvent({
    object: Objects.SOURCE,
    verb: Verbs.ADD,
    attributes: { [Attributes.SOURCE]: sourceName },
  })
}

export const trackSourceRemove = (sourceName: string) => {
  trackEvent({
    object: Objects.SOURCE,
    verb: Verbs.REMOVE,
    attributes: { [Attributes.SOURCE]: sourceName },
  })
}

export const trackListingModeSelect = (listingMode: 'compact' | 'normal') => {
  trackEvent({
    object: Objects.LISTING_MODE,
    verb: Verbs.SELECT,
    attributes: { [Attributes.LISTING_MODE]: listingMode },
  })
}

export const trackLinkBookmark = (attributes: { [P: string]: string }) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.BOOKMARK,
    attributes,
  })
}

export const trackLinkUnBookmark = (attributes: { [P: string]: string }) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.UNBOOKMARK,
    attributes,
  })
}

export const trackLinkOpen = (attributes: { [P: string]: string | number | undefined }) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.OPEN,
    attributes: attributes,
  })
}

export const trackTabTarget = (enabled: boolean) => {
  trackEvent({
    object: Objects.TAB,
    verb: Verbs.TARGET,
    attributes: { [Attributes.TARGET]: enabled ? 'New Tab' : 'Same Tab' },
  })
}

export const trackCardLanguageSelect = (sourceName: string, languageName: string) => {
  trackEvent({
    object: Objects.CARD,
    verb: Verbs.SELECT,
    attributes: { [Attributes.LANGUAGE]: languageName, [Attributes.SOURCE]: sourceName },
  })
}

export const trackCardDateRangeSelect = (sourceName: string, dateRange: string) => {
  trackEvent({
    object: Objects.CARD,
    verb: Verbs.SELECT,
    attributes: { [Attributes.DATE_RANGE]: dateRange, [Attributes.SOURCE]: sourceName },
  })
}

export const trackChangeLogOpen = () => {
  trackEvent({
    object: Objects.CHANGE_LOG,
    verb: Verbs.OPEN,
  })
}

export const trackMarketingCampaignOpen = (campaignId: string) => {
  trackEvent({
    object: Objects.MARKETING_CAMPAIGN,
    verb: Verbs.OPEN,
    attributes: { [Attributes.CAMPAIGN_ID]: campaignId },
  })
}

export const trackMarketingCampaignClose = (campaignId: string) => {
  trackEvent({
    object: Objects.MARKETING_CAMPAIGN,
    verb: Verbs.CLOSE,
    attributes: { [Attributes.CAMPAIGN_ID]: campaignId },
  })
}

export const trackMarketingCampaignView = (campaignId: string) => {
  trackEvent({
    object: Objects.MARKETING_CAMPAIGN,
    verb: Verbs.VIEW,
    attributes: { [Attributes.CAMPAIGN_ID]: campaignId },
  })
}

export const trackOnboardingStart = () => {
  trackEvent({
    object: Objects.ONBOARDING,
    verb: Verbs.START,
  })
}

export const trackOnboardingSkip = () => {
  trackEvent({
    object: Objects.ONBOARDING,
    verb: Verbs.SKIP,
  })
}

export const trackOnboardingFinish = () => {
  trackEvent({
    object: Objects.ONBOARDING,
    verb: Verbs.FINISH,
  })
}

export const trackRssSourceAdd = (source: string) => {
  trackEvent({
    object: Objects.RSS,
    verb: Verbs.ADD,
    attributes: { [Attributes.SOURCE]: source },
  })
}

export const trackPageDrag = () => {
  trackEvent({
    object: Objects.PAGE,
    verb: Verbs.DRAG,
  })
}

export const trackMaxVisibleCardsChange = (maxVisibleCards: number) => {
  trackEvent({
    object: Objects.CARD,
    verb: Verbs.CHANGE,
    attributes: { [Attributes.MAX_VISIBLE_CARDS]: maxVisibleCards },
  })
}

export const trackDNDEnable = (duration: number | 'always') => {
  trackEvent({
    object: Objects.DO_NOT_DISTURB,
    verb: Verbs.ENABLE,
    attributes: { [Attributes.DURATION]: duration },
  })
}

export const trackDNDDisable = () => {
  trackEvent({
    object: Objects.DO_NOT_DISTURB,
    verb: Verbs.DISABLE,
  })
}

export const trackLinkShare = ({
  title,
  source,
  link,
  provider,
}: {
  title: string
  source: string
  link: string
  provider: string
}) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.SHARE,
    attributes: {
      [Attributes.LINK]: link,
      [Attributes.TITLE]: title,
      [Attributes.SOURCE]: source,
      [Attributes.PROVIDER]: provider,
    },
  })
}

export const trackLinkCopy = ({
  title,
  source,
  link,
}: {
  title: string
  source: string
  link: string
}) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.COPY,
    attributes: {
      [Attributes.LINK]: link,
      [Attributes.TITLE]: title,
      [Attributes.SOURCE]: source,
    },
  })
}

export const trackUserConnect = (provider: string) => {
  trackEvent({
    object: Objects.USER,
    verb: Verbs.CONNECT,
    attributes: { [Attributes.PROVIDER]: provider },
  })
}

export const trackUserDisconnect = () => {
  trackEvent({
    object: Objects.USER,
    verb: Verbs.DISCONNECT,
  })
}

export const trackUserDelete = () => {
  trackEvent({
    object: Objects.USER,
    verb: Verbs.DELETE,
  })
}

export const trackDisplayTypeChange = (value: "grid" | "cards") => {
  trackEvent({
    object: Objects.DISPLAY_LAYOUT,
    verb: Verbs.CHANGE, 
    attributes: {
      [Attributes.DISPLAY_LAYOUT]: value,
    },
  })
}

export const trackFeedScroll = () => {
  trackEvent({
    object: Objects.FEED,
    verb: Verbs.SCROLL
  })
}
// Identification

export const identifyUserLanguages = (languages: string[]) => {
  identifyUserProperty(Attributes.LANGUAGES, languages)
}

export const identifyUserListingMode = (listingMode: 'compact' | 'normal') => {
  identifyUserProperty(Attributes.LISTING_MODE, listingMode)
}
export const identifyUserCards = (sources: string[]) => {
  identifyUserProperty(Attributes.SOURCES, sources)
}

export const identifyUserTheme = (theme: 'dark' | 'light') => {
  identifyUserProperty(Attributes.THEME, theme)
}

export const identifyUserSearchEngine = (searchEngineName: string) => {
  identifyUserProperty(Attributes.SEARCH_ENGINE, searchEngineName)
}
export const identifyUserLinksInNewTab = (enabled: boolean) => {
  identifyUserProperty(Attributes.TARGET, enabled ? 'New Tab' : 'Same Tab')
}
export const identifyUserOccupation = (occupation: string) => {
  identifyUserProperty(Attributes.OCCUPATION, occupation)
}
export const identifyUserMaxVisibleCards = (maxVisibleCards: number) => {
  identifyUserProperty(Attributes.MAX_VISIBLE_CARDS, maxVisibleCards)
}
export const identifyAdvBlocked = (blocked: boolean) => {
  identifyUserProperty(Attributes.ADV, blocked)
}
export const identifyUserStreak = (value: number) => {
  identifyUserProperty(Attributes.STREAK, value)
}
export const identifyDisplayLayout = (value: "grid" | "cards") => {
  identifyUserProperty(Attributes.DISPLAY_LAYOUT, value)
}
// Private functions
type trackEventProps = {
  object: Exclude<Objects, null | undefined>
  verb: Exclude<Verbs, null | undefined>
  attributes?: {
    //[P in Exclude<Attributes, null | undefined>]?: string;
    [P: string]: string | number | undefined
  }
}

const trackEvent = ({ object, verb, attributes }: trackEventProps) => {
  try {
    const event = `${object}${_SEP_}${verb}`

    if (attributes) {
      Object.keys(attributes).map((attr) => {
        const value = attributes[attr]
        if (!value) {
          return null
        }
        if (typeof value !== 'number') {
          attributes[attr] = value.toLowerCase()
        }
        return attr
      })

      // Remove http and www from links
      if (Object.keys(attributes).some((attr) => attr === Attributes.LINK)) {
        attributes[Attributes.LINK] = (attributes[Attributes.LINK] as string).replace(
          /(https*:\/\/[www.]*)/,
          ''
        )
      }
    }

    if (isDevelopment()) {
      console.log('analytics', event, attributes)
      return
    }

    track(event, attributes)
  } catch (e) {
    console.log('analytics', e)
  }
}

const identifyUserProperty = (
  attributes: Attributes,
  value: string | number | string[] | boolean
) => {
  try {
    let formatedValue
    if (Array.isArray(value)) {
      formatedValue = value.filter(Boolean).map((item) => item.toLowerCase())
    } else {
      formatedValue = typeof value === 'string' ? value.toLowerCase() : value.toString()
    }

    if (isDevelopment()) {
      console.log('analytics', 'identify', attributes, formatedValue)
      return
    }

    if (formatedValue == null) {
      return
    }

    const identity = new Identify()
    identity.set(attributes.toString(), formatedValue)
    identify(identity)
  } catch (e) {
    console.log('analytics', e)
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

const getScreenResolution = (): string => {
  const realWidth = window.screen.width
  const realHeight = window.screen.height
  return `${realWidth}x${realHeight}`
}
