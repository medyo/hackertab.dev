import HNCard from './cards/HNCard'
import DevToCard from './cards/DevToCard'
import ConferencesCard from './cards/ConferencesCard'
import JobsCard from './cards/JobsCard'
import ReposCard from './cards/ReposCard'
import ProductHuntCard from './cards/ProductHuntCard'
import RedditCard from './cards/RedditCard'
import LobstersCard from './cards/LobstersCard'
import { SiGithub } from 'react-icons/si'
import { SiYcombinator } from 'react-icons/si'
import { FaDev } from 'react-icons/fa'
import { SiProducthunt } from 'react-icons/si'
import { FaReddit } from 'react-icons/fa'
import { SiStackoverflow } from 'react-icons/si'
import { SiLetterboxd } from 'react-icons/si'

const APP = {
  name: 'Hackertab.dev',
  slogan: '— Stay updated with the new technology and trends',
  repository: 'https://github.com/medyo/hackertab.dev',
  ref: 'utm_source=hackertab.dev&utm_medium=post&utm_campaign=home',
  contactEmail: 'hello@hackertab.dev',
  maxCardsPerRow: 4,
  donationLink: 'https://www.buymeacoffee.com/medyo',
  supportLink: 'https://github.com/medyo/hackertab.dev/issues',
}

export const LOCAL_CONFIGURATION = {
  supportedTags: [], // Loaded remotly
}

export const SUPPORTED_CARDS = [
  {
    value: 'github',
    icon: <SiGithub />,
    analyticsTag: 'repos',
    label: 'Github repositories',
    component: ReposCard,
  },
  {
    value: 'jobs',
    icon: <SiStackoverflow />,
    analyticsTag: 'jobs',
    label: 'Featured jobs',
    component: JobsCard,
  },
  {
    value: 'hackernews',
    icon: <SiYcombinator />,
    analyticsTag: 'hackernews',
    label: 'Hackernews',
    component: HNCard,
  },
  {
    value: 'conferences',
    icon: <SiGithub />,
    analyticsTag: 'events',
    label: 'Upcoming events',
    component: ConferencesCard,
  },
  {
    value: 'devto',
    icon: <FaDev />,
    analyticsTag: 'devto',
    label: 'DevTo',
    component: DevToCard,
  },
  {
    value: 'producthunt',
    icon: <SiProducthunt />,
    analyticsTag: 'producthunt',
    label: 'Product Hunt',
    component: ProductHuntCard,
  },
  {
    value: 'reddit',
    icon: <FaReddit />,
    analyticsTag: 'reddit',
    label: 'Reddit',
    component: RedditCard,
  },

  {
    value: 'lobsters',
    icon: <SiLetterboxd />,
    analyticsTag: 'lobsters',
    label: 'Lobsters',
    component: LobstersCard,
  },
]

export const LS_PREFERENCES_KEY = 'hackerTabPrefs'
export const LS_ANALYTICS_ID_KEY = 'hackerTabAnalyticsId'

export { APP }
