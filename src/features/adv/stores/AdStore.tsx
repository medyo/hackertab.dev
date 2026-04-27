import { create } from 'zustand'

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
