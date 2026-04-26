import { AdPlaceholder } from 'src/components/placeholders'
import { trackAdvOpen } from 'src/lib/analytics'
import { useAdStore } from '../stores/AdStore'
import './AdvBanner.css'

export const AdvBanner = () => {
  const { ads, isLoading } = useAdStore()
  const ad = ads.length > 0 ? ads.find((ad) => ad.type !== 'sticky-ad') : null

  const onAdClick = () => {
    if (ad?.id) {
      trackAdvOpen(ad.id, {
        source: 'card',
      })
    }
  }

  if (isLoading) {
    return <AdPlaceholder />
  }

  if (!ad) {
    return null
  }
  const { type } = ad
  if (type === 'large-img') {
    return (
      <div className="largeImgAd">
        <a onClick={onAdClick} href={ad.link} target="_blank" title={ad.title}>
          <img src={ad.imageUrl} alt={ad.title} />
        </a>
      </div>
    )
  }

  if (type === 'small-img') {
    return (
      <a
        href={ad.link}
        onClick={onAdClick}
        className="smallImgAd"
        target="_blank"
        title={ad.title}
        style={{ background: ad.style.bg_color, color: ad.style.text_color }}>
        <img src={ad.imageUrl} alt={ad.title} className="illustration" />
        <div className="content">
          {ad.logoUrl && <img src={ad.logoUrl} alt={`${ad.title} logo`} className="logo" />}
          <p className="title">{ad.description}</p>
          <button
            className="cta"
            style={{ background: ad.style.cta_bg_color, color: ad.style.cta_text_color }}>
            {ad.cta_text}
          </button>
        </div>
        {ad.sponsored_by && (
          <a href={ad.link} className="sponsoredBadge" target="_blank" title="Sponsored">
            {ad.sponsored_by}
          </a>
        )}
      </a>
    )
  }

  return null
}
