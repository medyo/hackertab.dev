import create from 'zustand';
import { persist } from 'zustand/middleware'

type MarketingBannerStore = {
  closedCampaigns: string[];
  setCampaignClosed: (compaignName: string) => void;
};

export const useMarketingBanner = create(persist<MarketingBannerStore>((set) => ({
  closedCampaigns: [],
  setCampaignClosed: (compaignName: string) =>
    set((state) => ({
      closedCampaigns: [...state.closedCampaigns, compaignName]
    })),
}), {
  name: 'ht_marketing_storage',
}));
