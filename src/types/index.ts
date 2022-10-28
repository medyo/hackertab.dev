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

export type BookmarkedPost = {
  title: string,
  source: string,
  url: string;
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