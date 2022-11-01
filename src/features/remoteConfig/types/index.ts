export type Tag = {
  confsValues: string[]
  devtoValues: string[]
  hashnodeValues: string[]
  redditValues: string[]
  githubValues: string[]
  freecodecampValues: string[]
  mediumValues: string[]
  label: string
  value: string
}

export type TagValuesFieldType =
  | 'confsValues'
  | 'devtoValues'
  | 'hashnodeValues'
  | 'redditValues'
  | 'githubValues'
  | 'freecodecampValues'
  | 'mediumValues'

export type MarketingBannerConfig = {
  show: boolean
  campaign_name: string
  htmlContent: string
}

export type RemoteConfig = {
  supportedTags: Tag[]
  marketingBannerConfig?: MarketingBannerConfig
}
