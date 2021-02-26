import * as Panelbear from "@panelbear/panelbear-js";


const trackPageView = (pageName) => {
  trackEvent("OpenPage", pageName)
}

const trackThemeChange = (theme) => {
  trackEvent("ChangeTheme", theme)
}

const trackOpenLinkFrom = (dataSource) => {
  trackEvent("OpenLinkFrom", dataSource)
}

const trackAddLanguage = (language) => {
  trackEvent("AddLanguage", language)
}


const trackRemoveLanguage = (card) => {
  trackEvent("RemoveLanguage", card)
}

const trackAddCard = (card) => {
  trackEvent("AddCard", card)
}

const trackRemoveCard = (card) => {
  trackEvent("RemoveCard", card)
}

const trackOpenLinksNewTab = (enabled) => {
  if (enabled) {
    trackEvent("EnableOpenLinksNewTab")
  } else {
    trackEvent("DisableOpenLinksNewTab")
  }

}

const trackBookmarkFrom = (dataSource) => {
  trackEvent("BookmarkFrom", dataSource)
}

const trackUnbookmarkFrom = (dataSource) => {
  trackEvent("UnbookmarkFrom", dataSource)
}

const trackEvent = (eventName, eventValue) => {

  if (!window.$analyticsEnabled) {
    return
  }

  if (!eventValue) {
    Panelbear.track(eventName)
    return
  }

  Panelbear.track(`${eventName}${eventValue.capitalize()}`)
}

Object.assign(String.prototype, {
  capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }
});

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
  trackUnbookmarkFrom
}