import { useState } from 'react'
import { AdPlaceholder } from 'src/components/placeholders'
import { useUserPreferences } from 'src/stores/preferences'
import { useGetAd } from '../api/getAd'
import './AdvBanner.css'

export const AdvBanner = () => {
  const { userSelectedTags } = useUserPreferences()

  const [aditionalAdQueries, setAditionalAdQueries] = useState<
    { [key: string]: string } | undefined
  >()
  const {
    data: ad,
    isLoading,
    isError,
  } = useGetAd({
    keywords: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    aditionalAdQueries: aditionalAdQueries,
    config: {
      cacheTime: 0,
      staleTime: 0,
      useErrorBoundary: false,
      refetchInterval(data) {
        if (data?.nextAd) {
          setAditionalAdQueries(data.nextAd.queries)
          return data.nextAd.interval
        }
        return false
      },
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
      {ad.viewUrl &&
        ad.viewUrl
          .split('||')
          .map((viewUrl, i) => <img key={i} src={viewUrl} className="hidden" alt="" />)}
    </div>
  )
}
