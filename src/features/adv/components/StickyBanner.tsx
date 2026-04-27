import jsonPath from 'jsonpath'
import { useEffect, useMemo } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useAdStore } from 'src/features/adv/stores/AdStore'
import { useAuth } from 'src/features/auth'
import { trackAdvOpen, trackAdvView } from 'src/lib/analytics'
import { useUserPreferences } from 'src/stores/preferences'
import { diffBetweenTwoDatesInDays } from 'src/utils/DateUtils'
import { getBrowserName, isProduction, isWebOrExtensionVersion } from 'src/utils/Environment'
import { getAppVersion } from 'src/utils/Os'

export const StickyBanner = () => {
  const { isConnected, user } = useAuth()
  const { userSelectedTags, cards, firstSeenDate } = useUserPreferences()
  const isMobile = useMediaQuery({ maxWidth: 767 })
  const { ads } = useAdStore()

  const ad = ads.length > 0 ? ads.find((ad) => ad.type === 'sticky-ad') : null

  const onAdClick = () => {
    if (ad?.id) {
      trackAdvOpen(ad.id, {
        source: 'header',
      })
    }
  }

  const userAttributes = useMemo(() => {
    return {
      platform: isWebOrExtensionVersion(),
      browser: getBrowserName(),
      version: getAppVersion() || '0.0.0',
      device: isMobile ? 'mobile' : 'desktop',
      environment: isProduction() ? 'prod' : 'dev',
      userTags: userSelectedTags.map((tag) => tag.label),
      cards: cards.map((card) => card.name),
      firstSeenDate,
      isConnected,
      isSupported: user?.isSupporter || false,
      usageInDays: diffBetweenTwoDatesInDays(firstSeenDate, Date.now()),
    }
  }, [userSelectedTags, firstSeenDate, cards, user])

  const shouldShowAd =
    ad && (!ad.condition || jsonPath.query([userAttributes], ad.condition)?.length > 0)

  useEffect(() => {
    if (shouldShowAd) {
      trackAdvView(ad!.id, {
        source: 'header',
      })
    }
  }, [shouldShowAd])

  if (!shouldShowAd) {
    return null
  }

  return (
    <a
      className="stickyAd"
      href={ad.link}
      style={{ background: ad.style.bg_color, color: ad.style.text_color }}
      target="_blank"
      onClick={onAdClick}
      title={ad.title}>
      <div className="content">
        <img src={ad.imageUrl} className="logo" />
        <span className="title">{ad.title}</span>
      </div>

      <button
        className="cta"
        style={{ background: ad.style.cta_bg_color, color: ad.style.cta_text_color }}>
        {ad.cta_text}
      </button>

      {ad.sponsored_by && (
        <a href={ad.link} className="sponsoredBadge" target="_blank" title="Sponsored">
          {ad.sponsored_by}
        </a>
      )}
    </a>
  )
}
