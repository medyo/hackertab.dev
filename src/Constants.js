import HNCard from "./cards/HNCard";
import DevToCard from "./cards/DevToCard";
import ConferencesCard from "./cards/ConferencesCard";
import JobsCard from "./cards/JobsCard";
import ReposCard from "./cards/ReposCard";
import ProductHuntCard from "./cards/ProductHuntCard";
import RedditCard from "./cards/RedditCard";
import LobstersCard from './cards/LobstersCard'

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
  { value: 'github', analyticsTag: 'repos', label: 'Github repositories', component: ReposCard },
  { value: 'jobs', analyticsTag: 'jobs', label: 'Featured jobs', component: JobsCard },
  { value: 'hackernews', analyticsTag: 'hackernews', label: 'Hackernews', component: HNCard },
  {
    value: 'conferences',
    analyticsTag: 'events',
    label: 'Upcoming events',
    component: ConferencesCard,
  },
  { value: 'devto', analyticsTag: 'devto', label: 'DevTo', component: DevToCard },
  {
    value: 'producthunt',
    analyticsTag: 'producthunt',
    label: 'Product Hunt',
    component: ProductHuntCard,
  },
  { value: 'reddit', analyticsTag: 'reddit', label: 'Reddit', component: RedditCard },
  { value: 'lobsters', analyticsTag: 'lobsters', label: 'Lobsters', component: LobstersCard },
]

export const LS_PREFERENCES_KEY = "hackerTabPrefs"
export const LS_ANALYTICS_ID_KEY = "hackerTabAnalyticsId"

export {
  APP
} 
