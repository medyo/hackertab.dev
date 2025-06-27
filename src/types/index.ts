export type SearchEngineType = {
  url: string
  label: string
  logo?: string
  className?: string
  default?: boolean
}

export type SelectedCard = {
  id: number
  name: string
  type: 'rss' | 'supported'
}

export type SelectedTag = {
  label: string
  value: string
}

export type SearchEngine = {
  url: string
  label: string
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className?: string
}

export type Layout = 'grid' | 'cards'
export type Theme = 'dark' | 'light'
export type ListingMode = 'normal' | 'compact'

export type BaseEntry = {
  id: string
  url: string
  title: string
}

export type Article = BaseEntry & {
  published_at: number
  tags: Array<string>
  reactions: number
  comments: number
  image_url: string
  source: string
  original_url?: string
  comments_url?: string
  description?: string
  subreddit?: string
  flair_text?: string
  flair_background_color?: string
  flair_text_color?: string
}

export type FeedItem = {
  title: string
  id: string
  url: string
  date: Date
  image: string
  tags: Array<string>
}

export type ArticleFeedItemData = FeedItem & {
  type: 'post'
  source: string
}

export type ProductHuntFeedItemData = FeedItem & {
  type: 'producthunt'
  tagline: string
  votes: number
  comments: number
}

export type GithubFeedItemData = FeedItem & {
  type: 'github'
  stars: number
  forks: number
  programmingLanguage: string
  description?: string
}

export type FeedItemData = ArticleFeedItemData | GithubFeedItemData | ProductHuntFeedItemData

export type Repository = BaseEntry & {
  programmingLanguage: string
  stars: number
  source: string
  description: string
  owner: string
  forks: number
  starsInDateRange?: number
  name: string
}

export type Conference = BaseEntry & {
  start_date: number
  end_date: number
  tag: string
  online: Boolean
  city?: string
  country?: string
}

export type SupportedCardType = {
  value: string
  analyticsTag: string
  label: string
  link?: string
  type: 'rss' | 'supported'
  component?: React.FunctionComponent<CardPropsType>
  feedUrl?: string
  icon?: React.ReactNode | string
  badge?: string
}

export type CardPropsType = {
  meta: Omit<SupportedCardType, 'component'>
  withAds: boolean
}

export type BaseItemPropsType<T extends BaseEntry> = {
  index: number
  item: T
  analyticsTag: string
  selectedTag?: SelectedTag
}

export type CardSettingsType = {
  language: string
  dateRange?: string
}

export type Option = {
  label: string
  value: string
  icon?: React.ReactNode
  removeable?: boolean
}

export type DNDDuration =
  | {
      value: number
      countdown: number
    }
  | 'always'
  | 'never'
