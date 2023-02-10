import DOMPurify from 'dompurify'
import jsonPath from 'jsonpath'
import { useEffect, useMemo, useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  trackMarketingCampaignClose,
  trackMarketingCampaignOpen,
  trackMarketingCampaignView,
} from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { diffBetweenTwoDatesInDays } from 'src/utils/DateUtils'
import { getBrowserName, isProduction, isWebOrExtensionVersion } from 'src/utils/Environment'
import { getAppVersion } from 'src/utils/Os'
import { useGetMarketingConfig } from '../api/getMarketingConfig'
import { useMarketingConfigStore } from '../stores/marketingBanner'
import { Campaign, MarketingConfig } from '../types'

export const MarketingBanner = () => {
  const { setCampaignClosed, closedCampaigns } = useMarketingConfigStore()
  const { userSelectedTags, cards, firstSeenDate } = useUserPreferences()
  const [availableCampaigns, setAvailableCampaigns] = useState<Campaign[]>([])
  const { data: marketingConfig } = useGetMarketingConfig({
    config: {
      staleTime: 60000,
      cacheTime: 600000,
    },
  })

  const userAtttributes = useMemo(() => {
    return {
      platform: isWebOrExtensionVersion(),
      browser: getBrowserName(),
      version: getAppVersion() || '0.0.0',
      device: isMobile ? 'mobile' : 'desktop',
      environment: isProduction() ? 'prod' : 'dev',
      userTags: userSelectedTags.map((tag) => tag.label),
      cards: cards.map((card) => card.name),
      firstSeenDate,
      usageInDays: diffBetweenTwoDatesInDays(firstSeenDate, Date.now()),
    }
  }, [userSelectedTags, firstSeenDate, cards])

  useEffect(() => {
    if (marketingConfig && marketingConfig.version === 1) {
      const availableCampaigns: Campaign[] = getAvailableCampaigns(marketingConfig)
      setAvailableCampaigns(availableCampaigns)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketingConfig, closedCampaigns, userSelectedTags, cards])

  useEffect(() => {
    if (availableCampaigns.length) {
      trackMarketingCampaignView(availableCampaigns[0].id)
    }
  }, [availableCampaigns])

  if (!marketingConfig) {
    return null
  }

  const getAvailableCampaigns = (config: MarketingConfig) => {
    const campaignsWithUserAttr = config.campaigns.map((camp) => {
      return { ...camp, attrs: userAtttributes }
    })

    const lastVisibleAdDate = Math.max(...closedCampaigns.map((camp) => camp.date))
    if (lastVisibleAdDate > Date.now() - config.campaigns_interval) {
      return []
    }

    try {
      const closedCampaignsSet = new Set(closedCampaigns.map((closedCamp) => closedCamp.id))
      const availableCampaigns = campaignsWithUserAttr
        .filter((camp) => camp.enabled && !closedCampaignsSet.has(camp.id))
        .flatMap((camp) => jsonPath.query([camp], camp.condition) as Campaign[])
        .sort((a, b) => (a.priority || 0) - (b.priority || 0))
        .reverse()

      return availableCampaigns
    } catch (e) {
      return []
    }
  }

  if (!marketingConfig.enabled) {
    return null
  }

  if (!availableCampaigns.length) {
    return null
  }

  const onBannerClick = (e: React.MouseEvent<HTMLElement>, campaign: Campaign) => {
    if (e.target instanceof Element) {
      const closeButton = e.target.closest('.close')
      const ctaButton = e.target.closest('.cta')
      if (closeButton && e.currentTarget.contains(closeButton)) {
        setCampaignClosed(campaign.id)
        trackMarketingCampaignClose(campaign.id)
      } else if (ctaButton && e.currentTarget.contains(ctaButton)) {
        trackMarketingCampaignOpen(campaign.id)
      }
    }
  }

  const currentCampaign = availableCampaigns[0]

  return (
    <div
      id={currentCampaign.id}
      onClick={(e) => onBannerClick(e, currentCampaign)}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(currentCampaign.htmlContent, {
          ADD_ATTR: ['target'],
          USE_PROFILES: { html: true, svg: true },
        }),
      }}
    />
  )
}
