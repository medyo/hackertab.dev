import { ReactComponent as BaiduLogo } from 'src/assets/baidu_logo.svg'
import { ReactComponent as BingLogo } from 'src/assets/bing_logo.svg'
import { ReactComponent as DuckDuckGoLogo } from 'src/assets/duckduckgo_logo.svg'
import { ReactComponent as GoogleLogo } from 'src/assets/google_logo.svg'
import { ReactComponent as PhindLogo } from 'src/assets/phind_logo.svg'
import { ReactComponent as StartPageLogo } from 'src/assets/startpage_logo.svg'
import { ReactComponent as YahooLogo } from 'src/assets/yahoo_logo.svg'
import { ReactComponent as YandexLogo } from 'src/assets/yandex_logo.svg'

// Keys
export const ANALYTICS_ENDPOINT = import.meta.env.VITE_AMPLITUDE_URL as string
export const ANALYTICS_SDK_KEY = import.meta.env.VITE_AMPLITUDE_KEY as string
export const API_ENDPOINT = import.meta.env.VITE_API_URL as string
export const LS_ANALYTICS_ID_KEY = 'hackerTabAnalyticsId'
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
// Cfgs
export const SUPPORTED_SEARCH_ENGINES = [
  {
    label: 'Google',
    url: 'https://google.com/search?q=',
    logo: GoogleLogo,
  },
  {
    label: 'DuckDuckGo',
    url: 'https://duckduckgo.com?q=',
    logo: DuckDuckGoLogo,
  },
  {
    label: 'Bing',
    url: 'https://bing.com/search?q=',
    logo: BingLogo,
  },
  {
    label: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
    logo: YahooLogo,
  },
  {
    label: 'Baidu',
    url: 'https://baidu.com/s?wd=',
    logo: BaiduLogo,
  },
  {
    label: 'Yandex',
    url: 'https://yandex.ru/search/?text=',
    logo: YandexLogo,
    className: 'themeAdaptiveFillColor',
  },
  {
    label: 'Startpage',
    url: 'https://www.startpage.com/sp/search?query=',
    logo: StartPageLogo,
  },
  {
    label: 'Phind',
    url: 'https://phind.com/search?q=',
    logo: PhindLogo,
    className: 'themeAdaptiveFillColor',
  },
]

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
