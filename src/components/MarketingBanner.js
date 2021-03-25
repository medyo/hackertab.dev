import DOMPurify from 'dompurify';


const MarketingBanner = ({ show, htmlContent }) => {
  if (!show) { return null }
  let cleanHtmlContent = DOMPurify.sanitize(htmlContent);

  return (
    <div className='marketingBanner' dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />
  )
}

export default MarketingBanner