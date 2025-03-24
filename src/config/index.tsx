// Keys
export const ANALYTICS_ENDPOINT = import.meta.env.VITE_AMPLITUDE_URL as string
export const ANALYTICS_SDK_KEY = import.meta.env.VITE_AMPLITUDE_KEY as string
export const API_ENDPOINT = import.meta.env.VITE_API_URL as string
export const LS_ANALYTICS_ID_KEY = 'hackerTabAnalyticsId'
export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY as string
export const BUILD_TARGET = (import.meta.env.VITE_BUILD_TARGET as 'web' | 'extension') || 'web'

// Meta
export const name = 'Hackertab.dev'
export const slogan = '— Stay updated with the new technology and trends'
export const repository = 'https://github.com/medyo/hackertab.dev'
export const ref = 'ref=hackertab.dev'
export const contactEmail = 'hello@hackertab.dev'
export const maxCardsPerRow = 4
export const supportLink = 'https://github.com/medyo/hackertab.dev/issues'
export const privacyPolicyLink = 'https://www.hackertab.dev/privacy-policy'
export const termsAndConditionsLink = 'https://www.hackertab.dev/terms-and-conditions'
export const dataSourcesLink = 'https://www.hackertab.dev/data-sources'
export const changeLogLink = 'https://api.github.com/repos/medyo/hackertab.dev/releases'
export const twitterHandle = '@hackertabdev'
export const reportLink = 'https://www.hackertab.dev/report'

export const LS_PREFERENCES_KEY = 'hackerTabPrefs'
export const GLOBAL_TAG = {
  value: 'global',
  label: 'Trending',
  githubValues: ['global'],
  devtoValues: ['programming'],
  hashnodeValues: ['programming'],
  mediumValues: ['programming'],
  redditValues: ['programming'],
  freecodecampValues: ['programming'],
}
export const MY_LANGUAGES_TAG = {
  value: 'myLangs',
  label: 'My Languages',
  githubValues: ['myLangs'],
  devtoValues: ['myLangs'],
  hashnodeValues: ['myLangs'],
  mediumValues: ['myLangs'],
  redditValues: ['myLangs'],
  freecodecampValues: ['myLangs'],
}
export const MAX_ITEMS_PER_CARD = 50

export type DateRangeType = {
  value: 'daily' | 'monthly' | 'weekly'
  label: string
}
export const dateRanges: DateRangeType[] = [
  { label: 'the day', value: 'daily' },
  { label: 'the week', value: 'weekly' },
  { label: 'the month', value: 'monthly' },
]
