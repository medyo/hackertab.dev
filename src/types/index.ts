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
  userSelectedTags: string[]
  userBookmarks: any[]
  theme: "light" | "dark",
  openLinksNewTab: boolean,
  listingMode: "normal" | "compact",
  searchEngine: string,
  cards: SelectedCard[]
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
  listingMode: ListingMode
}
