import React from 'react'
import ConferencesCard from './cards/ConferencesCard'
import ReposCard from './cards/ReposCard'
import FreeCodeCampCard from './cards/FreeCodeCampCard'
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






const APP = {
  name: 'Hackertab.dev',
  slogan: '— Stay updated with the new technology and trends',
  repository: 'https://github.com/medyo/hackertab.dev',
  ref: 'utm_source=hackertab.dev&utm_medium=post&utm_campaign=home',
  contactEmail: 'hello@hackertab.dev',
  maxCardsPerRow: 4,
  supportLink: 'https://github.com/medyo/hackertab.dev/issues',
  privacyPolicyLink: 'https://www.hackertab.dev/privacy-policy',
  termsAndConditionsLink: 'https://www.hackertab.dev/terms-and-conditions',
  dataSourcesLink: 'https://www.hackertab.dev/data-sources',
  changeLogLink: 'https://api.github.com/repos/medyo/hackertab.dev/releases',
}

export const SUPPORTED_CARDS = [
  {
    value: 'github',
    icon: <SiGithub className="blockHeaderWhite" />,
    analyticsTag: 'repos',
    label: 'Github repositories',
    component: ReposCard,
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
    icon: <img src={LobstersIcon} />,
    analyticsTag: 'lobsters',
    label: 'Lobsters',
    component: LobstersCard,
  },
  {
    value: 'hashnode',
    icon: <img src={HashNodeIcon} />,
    analyticsTag: 'hashnode',
    label: 'Hashnode',
    component: HashnodeCard,
  },
  {
    value: 'freecodecamp',
    icon: <FaFreeCodeCamp className="blockHeaderWhite" />,
    analyticsTag: 'freecodecamp',
    label: 'FreeCodeCamp',
    component: FreeCodeCampCard,
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
  }
]

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
export const LS_PREFERENCES_KEY = 'hackerTabPrefs'
export const GLOBAL_TAG = {
  value: 'global',
  label: 'Trending',
  githubValues: ['global'],
  devtoValues: ['programming'],
  hashnodeValues: ['programming'],
  mediumValues: ['programming'],
}
export const MY_LANGUAGES_TAG = {
  value: 'myLangs',
  label: 'My Languages',
  githubValues: ['myLangs'],
  devtoValues: ['myLangs'],
  hashnodeValues: ['myLangs'],
  mediumValues: ['myLangs'],
}
export const MAX_MERGED_ITEMS_PER_LANGUAGE = 10
export { APP }
