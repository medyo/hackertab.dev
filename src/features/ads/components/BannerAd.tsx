import './BannerAd.css'
import { useGetAd } from '../api/getAd'
import { useUserPreferences } from 'src/stores/preferences'
import { AdPlaceholder } from 'src/components/placeholders'

export const BannerAd = () => {
  const { userSelectedTags } = useUserPreferences()
  const {
    data: ad,
    isLoading,
    isError,
  } = useGetAd({
    keywords: userSelectedTags.map(tag => tag.label.toLocaleLowerCase()),
    config: {
      cacheTime: 0,
      staleTime: 0,
    },
  })

  if (isLoading) {
    return <AdPlaceholder />
  }

  if (isError || !ad) {
    return null
  }

  return (
    <div className="ad-wrapper blockRow">
      <div id="bannerads">
        <span>
          <span className="wrap">
            <a
              href={ad.link}
              className="img"
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

            <a href={ad.link} className="text" target="_blank" rel="noopener sponsored noreferrer">
              {ad.description}
            </a>
          </span>

          <a
            href={ad.provider.link}
            className="poweredby"
            target="_blank"
            rel="noopener sponsored noreferrer">
            {ad.provider.title}
          </a>
        </span>
      </div>
      {ad.viewUrl && (
        <img src={ad.viewUrl} key={ad.viewUrl} className="hidden" alt="" />
      )}
    </div>
  )
}
