export type Tag = {
  label: string
  value: string
  category?: string
}

export type RemoteConfig = {
  tags: Tag[]
  ads_fetch_delay_ms?: number
}
