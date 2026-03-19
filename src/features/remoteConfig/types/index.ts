export type Tag = {
  label: string
  value: string
  category?: string
}

export type RemoteConfig = {
  tags: Tag[]
  ads_fetch_delay_ms?: number
  paywall?: {
    id: string
    enabled: boolean
    header_cta: string
    cta_url: string
    cta: string
    lead_description: string
    caption: string
    header_image: string
    features: string[]
  }
}
