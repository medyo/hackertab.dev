type AdProvider = {
  name: string
  title: string
  link?: string
}

type NextAdType = {
  queries: { [key: string]: string }
  interval: number
}

export type Ad = {
  title?: string
  description: string
  imageUrl: string
  viewUrl?: string
  link: string
  backgroundColor?: string
  provider: AdProvider
  nextAd?: NextAdType

  largeImage?: string
  logo?: string
  companyTagline?: string
  callToAction?: string
  company?: string
}
