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

export type RemoteConfig = {
  supportedTags: Tag[]
  refresh_rate: number | false
  marketingBannerConfig?: any
  adsConfig: {
    rowPosition: number
    columnPosition: number
    enabled: boolean
  }
}
