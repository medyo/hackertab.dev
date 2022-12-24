import DOMPurify from 'dompurify'

type MarketingBannerProps = {
  show: boolean
  htmlContent: string
}
export const MarketingBanner = ({ show, htmlContent }: MarketingBannerProps) => {
  if (!show) {
    return null
  }
  let cleanHtmlContent = DOMPurify.sanitize(htmlContent)

  return <div dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />
}
