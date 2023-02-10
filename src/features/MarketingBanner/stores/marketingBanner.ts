import { create } from 'zustand';

import { persist } from 'zustand/middleware';

type ClosedCampaign = {
  id: string;
  date: number;
}

type MarketingBannerStore = {
  closedCampaigns: ClosedCampaign[];
  setCampaignClosed: (compaignId: string) => void;
};

export const useMarketingConfigStore = create(persist<MarketingBannerStore>((set) => ({
  closedCampaigns: [],
  setCampaignClosed: (compaignId: string) =>
    set((state) => ({
      closedCampaigns: [...state.closedCampaigns, {
        id: compaignId,
        date: Date.now()
      }]
    })),
}), {
  name: 'ht_marketing_storage',
}));
