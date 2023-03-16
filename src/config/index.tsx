import { CgIndieHackers } from 'react-icons/cg'
import { FaDev, FaFreeCodeCamp, FaMediumM, FaReddit } from 'react-icons/fa'
import { HiTicket } from 'react-icons/hi'
import { SiGithub, SiProducthunt, SiYcombinator } from 'react-icons/si'
import { ReactComponent as BaiduLogo } from 'src/assets/baidu_logo.svg'
import { ReactComponent as BingLogo } from 'src/assets/bing_logo.svg'
import { ReactComponent as DuckDuckGoLogo } from 'src/assets/duckduckgo_logo.svg'
import { ReactComponent as GoogleLogo } from 'src/assets/google_logo.svg'
import HashNodeIcon from 'src/assets/icon_hashnode.png'
import LobstersIcon from 'src/assets/icon_lobsters.png'
import { ReactComponent as StartPageLogo } from 'src/assets/startpage_logo.svg'
import { ReactComponent as YahooLogo } from 'src/assets/yahoo_logo.svg'
import { ReactComponent as YandexLogo } from 'src/assets/yandex_logo.svg'

import {
  ConferencesCard,
  DevtoCard,
  FreecodecampCard,
  GithubCard,
  HackernewsCard,
  HashnodeCard,
  IndiehackersCard,
  LobstersCard,
  MediumCard,
  ProductHuntCard,
  RedditCard,
} from 'src/features/cards'
import { SupportedCardType } from 'src/types'

// Keys
export const ANALYTICS_ENDPOINT = process.env.REACT_APP_AMPLITUDE_URL as string
export const ANALYTICS_SDK_KEY = process.env.REACT_APP_AMPLITUDE_KEY as string
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
  },
  {
    label: 'Startpage',
    url: 'https://www.startpage.com/sp/search?query=',
    logo: StartPageLogo,
  },
]
export const SUPPORTED_CARDS: SupportedCardType[] = [
  {
    value: 'github',
    analyticsTag: 'github',
    label: 'Github repositories',
    component: GithubCard,
    icon: <SiGithub className="blockHeaderWhite" />,
    link: 'https://github.com/',
    type: 'supported',
  },
  {
    value: 'hackernews',
    icon: <SiYcombinator color="#FB6720" />,
    analyticsTag: 'hackernews',
    label: 'Hackernews',
    component: HackernewsCard,
    link: 'https://news.ycombinator.com/',
    type: 'supported',
  },
  {
    value: 'conferences',
    icon: <HiTicket color="#4EC8AF" />,
    analyticsTag: 'events',
    label: 'Upcoming events',
    component: ConferencesCard,
    link: 'https://confs.tech/',
    type: 'supported',
  },
  {
    value: 'devto',
    icon: <FaDev className="blockHeaderWhite" />,
    analyticsTag: 'devto',
    label: 'DevTo',
    component: DevtoCard,
    link: 'https://dev.to/',
    type: 'supported',
  },
  {
    value: 'producthunt',
    icon: <SiProducthunt color="#D65736" />,
    analyticsTag: 'producthunt',
    label: 'Product Hunt',
    component: ProductHuntCard,
    link: 'https://producthunt.com/',
    type: 'supported',
  },
  {
    value: 'reddit',
    icon: <FaReddit color="#FF4500" />,
    analyticsTag: 'reddit',
    label: 'Reddit',
    component: RedditCard,
    link: 'https://reddit.com/',
    type: 'supported',
  },
  {
    value: 'lobsters',
    icon: <img alt="lobsters" src={LobstersIcon} />,
    analyticsTag: 'lobsters',
    label: 'Lobsters',
    component: LobstersCard,
    link: 'https://lobste.rs/',
    type: 'supported',
  },
  {
    value: 'hashnode',
    icon: <img alt="hn" src={HashNodeIcon} />,
    analyticsTag: 'hashnode',
    label: 'Hashnode',
    component: HashnodeCard,
    link: 'https://hashnode.com/',
    type: 'supported',
  },
  {
    value: 'freecodecamp',
    icon: <FaFreeCodeCamp className="blockHeaderWhite" />,
    analyticsTag: 'freecodecamp',
    label: 'FreeCodeCamp',
    component: FreecodecampCard,
    link: 'https://freecodecamp.com/news',
    type: 'supported',
  },
  {
    value: 'indiehackers',
    icon: <CgIndieHackers className="blockHeaderWhite" />,
    analyticsTag: 'indiehackers',
    label: 'IndieHackers',
    component: IndiehackersCard,
    link: 'https://indiehackers.com/',
    type: 'supported',
  },
  {
    value: 'medium',
    icon: <FaMediumM className="blockHeaderWhite" />,
    analyticsTag: 'medium',
    label: 'Medium',
    component: MediumCard,
    link: 'https://medium.com/',
    type: 'supported',
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
