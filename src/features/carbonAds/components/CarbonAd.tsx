import './CarbonAd.css'
import { addHttpsProtocol } from 'src/utils/UrlUtils'
import { useGetAd } from '../api/getAd'
export default function CarbonAd() {
  const { data: ad } = useGetAd()

  if (!ad) {
    return null
  }

  return (
    <div className="carbon-ad-wrapper blockRow">
      {ad && (
        <div id="carbonads">
          <span>
            <span className="carbon-wrap">
              <a
                href={addHttpsProtocol(ad.statlink)}
                className="carbon-img"
                target="_blank"
                rel="noopener sponsored noreferrer"
                title={ad.company + ' ' + ad.companyTagline}>
                <img
                  src={ad.smallImage}
                  alt={ad.company}
                  height="100"
                  width="130"
                  style={{ background: ad.backgroundColor, border: 0 }}
                />
              </a>

              <a
                href={addHttpsProtocol(ad.statlink)}
                className="carbon-text"
                target="_blank"
                rel="noopener sponsored noreferrer">
                {ad.description}
              </a>
            </span>

            <a
              href={ad.ad_via_link}
              className="carbon-poweredby"
              target="_blank"
              rel="noopener sponsored noreferrer">
              ads via Carbon
            </a>
          </span>
        </div>
      )}
    </div>
  )
}
