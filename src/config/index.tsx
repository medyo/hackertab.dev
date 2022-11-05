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
import { HackernewsCard } from 'src/features/hackernewsCard'
import { ProductHuntCard } from 'src/features/producthuntCard'
import { IndiehackersCard } from 'src/features/indiehackersCard'
import { RedditCard } from 'src/features/redditCard'
import { LobstersCard } from 'src/features/lobstersCard'
import { DevtoCard } from 'src/features/devtoCard'
import { HashnodeCard } from 'src/features/hashnodeCard'
import { MediumCard } from 'src/features/mediumCard'
import { FreecodecampCard } from 'src/features/freecodecampCard'
import { GithubCard } from 'src/features/githubCard'
import { ConferencesCard } from 'src/features/conferencesCard'
import { CardPropsType } from 'src/types'

// Keys
export const ANALYTICS_ENDPOINT = 'https://api.hackertab.dev/analytics'
export const ANALYTICS_SDK_KEY = '9662c93f91473ba6e96711b22e0a367d'
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

type SupportedCard = {
  value: string
  icon: React.ReactNode
  analyticsTag: string
  label: string
  component: React.FunctionComponent<CardPropsType>
}
export const SUPPORTED_CARDS: SupportedCard[] = [
  {
    value: 'github',
    analyticsTag: 'repos',
    label: 'Github repositories',
    component: GithubCard,
    icon: <SiGithub className="blockHeaderWhite" />,
  },
  {
    value: 'hackernews',
    icon: <SiYcombinator color="#FB6720" />,
    analyticsTag: 'hackernews',
    label: 'Hackernews',
    component: HackernewsCard,
  },
  {
    value: 'conferences',
    icon: <HiTicket color="#4EC8AF" />,
    analyticsTag: 'events',
    label: 'Upcoming events',
    component: ConferencesCard,
  },
  {
    value: 'devto',
    icon: <FaDev className="blockHeaderWhite" />,
    analyticsTag: 'devto',
    label: 'DevTo',
    component: DevtoCard,
  },
  {
    value: 'producthunt',
    icon: <SiProducthunt color="#D65736" />,
    analyticsTag: 'producthunt',
    label: 'Product Hunt',
    component: ProductHuntCard,
  },
  {
    value: 'reddit',
    icon: <FaReddit color="#FF4500" />,
    analyticsTag: 'reddit',
    label: 'Reddit',
    component: RedditCard,
  },
  {
    value: 'lobsters',
    icon: <img alt="lobsters" src={LobstersIcon} />,
    analyticsTag: 'lobsters',
    label: 'Lobsters',
    component: LobstersCard,
  },
  {
    value: 'hashnode',
    icon: <img alt="hn" src={HashNodeIcon} />,
    analyticsTag: 'hashnode',
    label: 'Hashnode',
    component: HashnodeCard,
  },
  {
    value: 'freecodecamp',
    icon: <FaFreeCodeCamp className="blockHeaderWhite" />,
    analyticsTag: 'freecodecamp',
    label: 'FreeCodeCamp',
    component: FreecodecampCard,
  },
  {
    value: 'indiehackers',
    icon: <CgIndieHackers className="blockHeaderWhite" />,
    analyticsTag: 'indiehackers',
    label: 'IndieHackers',
    component: IndiehackersCard,
  },
  {
    value: 'medium',
    icon: <FaMediumM />,
    analyticsTag: 'medium',
    label: 'Medium',
    component: MediumCard,
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
  freecodecampValues: ['programming'],
}
export const MY_LANGUAGES_TAG = {
  value: 'myLangs',
  label: 'My Languages',
  githubValues: ['myLangs'],
  devtoValues: ['myLangs'],
  hashnodeValues: ['myLangs'],
  mediumValues: ['myLangs'],
  freecodecampValues: ['myLangs'],
}
export const MAX_MERGED_ITEMS_PER_LANGUAGE = 10
