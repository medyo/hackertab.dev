import './BannerAd.css'
import { useGetAd } from '../api/getAd'

export const BannerAd = () => {
  const { data: ad, isError } = useGetAd()

  if (isError || !ad) {
    return null
  }

  return (
    <div className="carbon-ad-wrapper blockRow">
      {ad && (
        <div id="bannerads">
          <span>
            <span className="carbon-wrap">
              <a
                href={ad.link}
                className="carbon-img"
                target="_blank"
                rel="noopener sponsored noreferrer"
                title={ad.title}>
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  height="100"
                  width="130"
                  style={{ border: 0 }}
                />
              </a>

              <a
                href={ad.link}
                className="carbon-text"
                target="_blank"
                rel="noopener sponsored noreferrer">
                {ad.description}
              </a>
            </span>

            <a
              href={ad.provider.link}
              className="carbon-poweredby"
              target="_blank"
              rel="noopener sponsored noreferrer">
              {ad.provider.title}
            </a>
          </span>
        </div>
      )}
    </div>
  )
}
