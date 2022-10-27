import AppStorage from '../services/localStorage';
import { init, track, identify, Identify } from '@amplitude/analytics-browser'
import { isDevelopment } from 'src/utils/Environment';
import { ANALYTICS_SDK_KEY, ANALYTICS_ENDPOINT, LS_ANALYTICS_ID_KEY } from 'src/Constants'
import {getAppVersion} from "src/utils/Os";

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
}

enum Verbs {
  VIEW = 'View',
  SCROLL = 'Scroll',
  SEARCH = 'Search',
  SELECT = 'Select',
  ADD = 'Add',
  OPEN = 'Open',
  TARGET = 'Target',
  BOOKMARK = 'Bookmark',
  UNBOOKMARK = 'Unbookmark',
  REMOVE = 'Remove',
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
  SOURCE_TAGS = 'Source Tags'
}

const _SEP_ = ' '

export const setupAnalytics = () => {
  init(ANALYTICS_SDK_KEY, getRandomUserId(), {
    disableCookies: true,
    serverUrl: ANALYTICS_ENDPOINT,
    appVersion: getAppVersion() || "0.0.0",
    useBatch: false
  })
}

export const setupIdentification = (state: any) => {
  identifyUserProperty(Attributes.RESOLUTION, getScreenResolution())
  identifyUserLanguages(state.userSelectedTags.map((tag: any) => tag.value))
  identifyUserTheme(state.theme)
  identifyUserCards(state.cards.map((card: any) => card.name))
  identifyUserListingMode(state.listingMode)
  identifyUserSearchEngine(state.searchEngine)
  identifyUserLinksInNewTab(state.searchEngine)
}

export const trackPageView = (pageName: string) => {
  trackEvent({
    object: Objects.PAGE,
    verb: Verbs.VIEW,
    attributes: { [Attributes.PAGE_NAME]: pageName }
  })
}

export const trackPageScroll = (direction: 'left' | 'right') => {
  trackEvent({
    object: Objects.PAGE,
    verb: Verbs.SCROLL,
    attributes: { [Attributes.DIRECTION]: direction }
  })
}

export const trackSearchEngineUse = (searchEngineName: string) => {
  trackEvent({
    object: Objects.SEARCH_ENGINE,
    verb: Verbs.SEARCH,
    attributes: { [Attributes.SEARCH_ENGINE]: searchEngineName }
  })
}

export const trackSearchEngineSelect = (searchEngineName: string) => {
  trackEvent({
    object: Objects.SEARCH_ENGINE,
    verb: Verbs.SELECT,
    attributes: { [Attributes.SEARCH_ENGINE]: searchEngineName }
  })
}

export const trackThemeSelect = (theme: "dark" | "light") => {
  trackEvent({
    object: Objects.THEME,
    verb: Verbs.SELECT,
    attributes: { [Attributes.THEME]: theme }
  })
}

export const trackLanguageAdd = (languageName: string) => {
  trackEvent({
    object: Objects.LANGUAGE,
    verb: Verbs.ADD,
    attributes: { [Attributes.LANGUAGE]: languageName }
  })
}

export const trackLanguageRemove = (languageName: string) => {
  trackEvent({
    object: Objects.LANGUAGE,
    verb: Verbs.REMOVE,
    attributes: { [Attributes.LANGUAGE]: languageName }
  })
}

export const trackSourceAdd = (sourceName: string) => {
  trackEvent({
    object: Objects.SOURCE,
    verb: Verbs.ADD,
    attributes: { [Attributes.SOURCE]: sourceName }
  })
}

export const trackSourceRemove = (sourceName: string) => {
  trackEvent({
    object: Objects.SOURCE,
    verb: Verbs.REMOVE,
    attributes: { [Attributes.SOURCE]: sourceName }
  })
}

export const trackListingModeSelect = (listingMode: "compact" | "normal") => {
  trackEvent({
    object: Objects.LISTING_MODE,
    verb: Verbs.SELECT,
    attributes: { [Attributes.LISTING_MODE]: listingMode }
  })
}

export const trackLinkBookmark = (attributes: {
  [P: string]: string;
}) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.BOOKMARK,
    attributes
  })
}

export const trackLinkUnBookmark = (attributes: {
  [P: string]: string;
}) => {
  trackEvent({
    object: Objects.LINK,
    verb: Verbs.UNBOOKMARK,
    attributes
  })
}

export const trackLinkOpen = (attributes: {
  [P: string]: string;
}) => {

  trackEvent({
    object: Objects.LINK,
    verb: Verbs.OPEN,
    attributes: attributes
  })
}

export const trackTabTarget = (enabled: boolean) => {
  trackEvent({
    object: Objects.TAB,
    verb: Verbs.TARGET,
    attributes: { [Attributes.TARGET]: enabled ? "New Tab" : "Same Tab" }
  })
}

export const trackCardLanguageSelect = (sourceName: string, languageName: string) => {
  trackEvent({
    object: Objects.CARD,
    verb: Verbs.SELECT,
    attributes: { [Attributes.LANGUAGE]: languageName, [Attributes.SOURCE]: sourceName }
  })
}

export const trackCardDateRangeSelect = (sourceName: string, dateRange: string) => {
  trackEvent({
    object: Objects.CARD,
    verb: Verbs.SELECT,
    attributes: { [Attributes.DATE_RANGE]: dateRange, [Attributes.SOURCE]: sourceName }
  })
}

export const trackChangeLogOpen = () => {
  trackEvent({
    object: Objects.CHANGE_LOG,
    verb: Verbs.OPEN
  })
}

// Identification

export const identifyUserLanguages = (languages: string[]) => {
  identifyUserProperty(Attributes.LANGUAGE, languages)
}

export const identifyUserListingMode = (listingMode: "compact" | "normal") => {
  identifyUserProperty(Attributes.LISTING_MODE, listingMode)
}
export const identifyUserCards = (sources: string[]) => {
  identifyUserProperty(Attributes.SOURCES, sources)
}

export const identifyUserTheme = (theme: "dark" | "light") => {
  identifyUserProperty(Attributes.THEME, theme)
}

export const identifyUserSearchEngine = (searchEngineName: string) => {
  identifyUserProperty(Attributes.SEARCH_ENGINE, searchEngineName)
}
export const identifyUserLinksInNewTab = (enabled: boolean) => {
  identifyUserProperty(Attributes.TARGET, enabled ? "New Tab" : "Same Tab")
}
// Private functions
type trackEventProps = {
  object: Exclude<Objects, null | undefined>,
  verb: Exclude<Verbs, null | undefined>,
  attributes?: {
    //[P in Exclude<Attributes, null | undefined>]?: string;
    [P: string]: string;
  }
}

const trackEvent = ({ object, verb, attributes }: trackEventProps) => {
  try {
    const event = `${object}${_SEP_}${verb}`

    if (attributes) {
      Object.keys(attributes).map(attr => {
        const value = attributes[attr];
        if (typeof value !== "number") {
          attributes[attr] = value.toLowerCase();
        }
        return attr;
      });

      // Remove http and www from links
      if (Object.keys(attributes).some((attr) => attr == Attributes.LINK)) {
        attributes[Attributes.LINK] = attributes[Attributes.LINK].replace(/(https*:\/\/[www.]*)/, '')
      }
    }

    if (isDevelopment()) {
      console.log("analytics", event, attributes)
      return;
    }

    track(event, attributes);
  } catch (e) {
    console.log("analytics", e)
  }
}

const identifyUserProperty = (attributes: Attributes, value: string | string[]) => {

  try {
    let formatedValue;
    if (Array.isArray(value)) {
      formatedValue = value.filter(Boolean).map(item => item.toLowerCase());
    } else {
      formatedValue = value.toLowerCase();
    }

    if (isDevelopment()) {
      console.log("analytics", "identify", attributes, formatedValue)
      return;
    }

    if (formatedValue == null) {
      return;
    }

    const identity = new Identify()
    identity.set(attributes.toString(), formatedValue)
    identify(identity)
  } catch (e) {
    console.log("analytics", e)
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