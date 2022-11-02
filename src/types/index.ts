import { Tag } from "src/features/remoteConfig"

export type SearchEngineType = {
  url: string
  label: string
}

export type SelectedCard = {
  id: number,
  name: string
}

export type SelectedTag = {
  label: string,
  value: string
}

export type UserPreferences = {
  userSelectedTags: Tag[]
  theme: "light" | "dark",
  openLinksNewTab: boolean,
  listingMode: "normal" | "compact",
  searchEngine: string,
  cards: SelectedCard[]
}

export type SearchEngine = {
  url: string,
  label: string,
}

export type Theme = "dark" | "light";
export type ListingMode = "normal" | "compact";

export type ArticleType = {
  id: string
  title: string
  url: string
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
  owner?: string
  forks?: string
  starsInDateRange?: string
}

export type CardPropsType = {
  label: string
  icon: React.ReactNode
  withAds: boolean
  analyticsTag?: string
}

export type ArticleItemPropsType = {
  index: number
  item: ArticleType
  listingMode?: ListingMode,
  selectedTag?: SelectedTag
}

export type CardSettingsType = {
  language: string
  dateRange?: string
}
