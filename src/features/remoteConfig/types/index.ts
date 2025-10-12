export type Tag = {
  label: string
  value: string
}

export type RemoteConfig = {
  supportedTags: Tag[]
  marketingBannerConfig?: any
  adsConfig: {
    rowPosition: number
    columnPosition: number
    enabled: boolean
  }
}
