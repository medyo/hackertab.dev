import React from 'react'
import { SiGithub } from 'react-icons/si'
import { SiYcombinator } from 'react-icons/si'
import { FaDev } from 'react-icons/fa'
import { SiProducthunt } from 'react-icons/si'
import { FaReddit, FaMediumM } from 'react-icons/fa'
import { HiTicket } from 'react-icons/hi'
import HashNodeIcon from 'src/assets/icon_hashnode.png'
import LobstersIcon from 'src/assets/icon_lobsters.png'
import { FaFreeCodeCamp } from 'react-icons/fa'
import { CgIndieHackers } from 'react-icons/cg'
import {
  HackernewsCard,
  ProductHuntCard,
  IndiehackersCard,
  FreecodecampCard,
  ConferencesCard,
  GithubCard,
  MediumCard,
  HashnodeCard,
  LobstersCard,
  DevtoCard,
  RedditCard,
} from 'src/features/cards'
import { CardPropsType } from 'src/types'

// Keys
export const ANALYTICS_ENDPOINT = process.env.REACT_APP_AMPLITUDE_URL as string
export const ANALYTICS_SDK_KEY = process.env.REACT_APP_AMPLITUDE_KEY as string
export const LS_ANALYTICS_ID_KEY = 'hackerTabAnalyticsId'
// Meta
export const name = 'Hackertab.dev'
export const slogan = '— Stay updated with the new technology and trends'
export const repository = 'https://github.com/medyo/hackertab.dev'
export const ref = 'utm_source=hackertab.dev&utm_medium=post&utm_campaign=home'
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
  },
  {
    label: 'DuckDuckGo',
    url: 'https://duckduckgo.com?q=',
  },
  {
    label: 'Bing',
    url: 'https://bing.com/search?q=',
  },
  {
    label: 'Yahoo',
    url: 'https://search.yahoo.com/search?p=',
  },
  {
    label: 'Baidu',
    url: 'https://baidu.com/s?wd=',
  },
  {
    label: 'Yandex',
    url: 'https://yandex.ru/search/?text=',
  },
  {
    label: 'Startpage',
    url: 'https://www.startpage.com/sp/search?query=',
  },
]

export type SupportedCard = {
  value: string
  icon: React.ReactNode
  analyticsTag: string
  label: string
  link: string
  component: React.FunctionComponent<CardPropsType>
}
export const SUPPORTED_CARDS: SupportedCard[] = [
  {
    value: 'github',
    analyticsTag: 'github',
    label: 'Github repositories',
    component: GithubCard,
    icon: <SiGithub className="blockHeaderWhite" />,
    link: 'https://github.com/',
  },
  {
    value: 'hackernews',
    icon: <SiYcombinator color="#FB6720" />,
    analyticsTag: 'hackernews',
    label: 'Hackernews',
    component: HackernewsCard,
    link: 'https://news.ycombinator.com/',
  },
  {
    value: 'conferences',
    icon: <HiTicket color="#4EC8AF" />,
    analyticsTag: 'events',
    label: 'Upcoming events',
    component: ConferencesCard,
    link: 'https://confs.tech/',
  },
  {
    value: 'devto',
    icon: <FaDev className="blockHeaderWhite" />,
    analyticsTag: 'devto',
    label: 'DevTo',
    component: DevtoCard,
    link: 'https://dev.to/',
  },
  {
    value: 'producthunt',
    icon: <SiProducthunt color="#D65736" />,
    analyticsTag: 'producthunt',
    label: 'Product Hunt',
    component: ProductHuntCard,
    link: 'https://producthunt.com/',
  },
  {
    value: 'reddit',
    icon: <FaReddit color="#FF4500" />,
    analyticsTag: 'reddit',
    label: 'Reddit',
    component: RedditCard,
    link: 'https://reddit.com/',
  },
  {
    value: 'lobsters',
    icon: <img alt="lobsters" src={LobstersIcon} />,
    analyticsTag: 'lobsters',
    label: 'Lobsters',
    component: LobstersCard,
    link: 'https://lobste.rs/',
  },
  {
    value: 'hashnode',
    icon: <img alt="hn" src={HashNodeIcon} />,
    analyticsTag: 'hashnode',
    label: 'Hashnode',
    component: HashnodeCard,
    link: 'https://hashnode.com/',
  },
  {
    value: 'freecodecamp',
    icon: <FaFreeCodeCamp className="blockHeaderWhite" />,
    analyticsTag: 'freecodecamp',
    label: 'FreeCodeCamp',
    component: FreecodecampCard,
    link: 'https://freecodecamp.com/news',
  },
  {
    value: 'indiehackers',
    icon: <CgIndieHackers className="blockHeaderWhite" />,
    analyticsTag: 'indiehackers',
    label: 'IndieHackers',
    component: IndiehackersCard,
    link: 'https://indiehackers.com/',
  },
  {
    value: 'medium',
    icon: <FaMediumM className="blockHeaderWhite" />,
    analyticsTag: 'medium',
    label: 'Medium',
    component: MediumCard,
    link: 'https://medium.com/',
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
