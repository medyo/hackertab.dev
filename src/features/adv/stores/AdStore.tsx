import { create } from 'zustand'

type CommonAdFields = {
  id: string
  link: string
  sponsored_by?: string
}

type AdStyle = {
  bg_color: string
  text_color: string
  cta_bg_color?: string
  cta_text_color?: string
}
type SmallImageAd = CommonAdFields & {
  type: 'small-img'
  title: string
  description: string
  logoUrl?: string
  imageUrl: string
  cta_text: string
  style: AdStyle
}

type LargeImageAd = CommonAdFields & {
  type: 'large-img'
  title: string
  description: string
  link: string
  imageUrl: string
}

type StickyAd = CommonAdFields & {
  type: 'sticky-ad'
  title: string
  imageUrl: string
  condition?: string
  cta_text: string
  style: AdStyle
  dismissible?: boolean
}

type Ad = SmallImageAd | LargeImageAd | StickyAd
type AdStore = {
  ads: Ad[]
  isLoading: boolean
  setAds: (ads: Ad[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useAdStore = create<AdStore>((set) => ({
  ads: [],
  isLoading: false,
  setAds: (ads: Ad[]) => set({ ads }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}))
