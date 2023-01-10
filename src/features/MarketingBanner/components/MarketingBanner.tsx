import DOMPurify from 'dompurify'
import { useMarketingBanner } from '../stores/marketingBanner'

type MarketingBannerProps = {
  show: boolean
  campaign_name: string
  htmlContent: string
}
export const MarketingBanner = ({ campaign_name, show, htmlContent }: MarketingBannerProps) => {
  const { setCampaignClosed, closedCampaigns } = useMarketingBanner()

  if (!show || closedCampaigns.includes(campaign_name)) {
    return null
  }

  let cleanHtmlContent = DOMPurify.sanitize(htmlContent)

  const onBannerClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof Element) {
      const closeButton = e.target.closest('.close')
      if (closeButton && e.currentTarget.contains(closeButton)) {
        setCampaignClosed(campaign_name)
      }
    }
  }

  return (
    <div onClick={(e) => onBannerClick(e)} dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />
  )
}
