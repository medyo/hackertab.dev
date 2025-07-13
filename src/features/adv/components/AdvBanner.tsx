import { useEffect, useState } from 'react'
import { AdPlaceholder } from 'src/components/placeholders'
import { useUserPreferences } from 'src/stores/preferences'
import { useGetAd } from '../api/getAd'
import { Ad } from '../types'
import './AdvBanner.css'

type AdvBannerProps = {
  feedDisplay?: boolean
  onAdLoaded?: (ad: Ad | null) => void
  loadingState?: React.ReactNode
}

export const AdvBanner = ({ feedDisplay = false, loadingState, onAdLoaded }: AdvBannerProps) => {
  const { userSelectedTags } = useUserPreferences()

  const [aditionalAdQueries, setAditionalAdQueries] = useState<
    { [key: string]: string } | undefined
  >()
  const {
    isSuccess,
    data: ad,
    isLoading,
    isError,
  } = useGetAd({
    keywords: userSelectedTags.map((tag) => tag.label.toLocaleLowerCase()),
    feed: true,
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

  useEffect(() => {
    if (isSuccess && ad) {
      onAdLoaded?.(ad)
    }
  }, [ad])

  if (isLoading) {
    return loadingState || <AdPlaceholder />
  }

  if (isError || !ad) {
    return null
  }

  if (ad.largeImage) {
    return (
      <div
        className="carbonCoverTarget"
        style={
          {
            '--ad-dynamic-bg-image': `url(${ad.largeImage})`,
            '--ad-gradient-color': ad.backgroundColor,
          } as React.CSSProperties
        }>
        <a href={ad.link} className="carbonCover">
          <img className="carbonCoverImage" src={ad.largeImage} />
          <div className="carbonCoverMain">
            <img className="carbonCoverLogo" src={ad.logo} />
            <div className="carbonCoverTagline">{ad.companyTagline}</div>
            <div className="carbonCoverDescription">{ad.description}</div>
            <div className="carbonCoverButton">{ad.callToAction + ' ↗'}</div>
          </div>
        </a>
      </div>
    )
  }

  return (
    <>
      <div className="banneradv">
        <a
          href={ad.link}
          className="img"
          target="_blank"
          rel="noopener sponsored noreferrer"
          title={ad.title}>
          <img
            src={ad.imageUrl}
            alt={ad.title}
            height={!feedDisplay ? '100' : '200'}
            width={!feedDisplay ? '130' : '260'}
            style={{ border: 0 }}
          />
        </a>

        <a href={ad.link} className="text" target="_blank" rel="noopener sponsored noreferrer">
          {ad.description}
        </a>

        {!feedDisplay && (
          <a
            href={ad.provider.link}
            className="poweredby"
            target="_blank"
            rel="noopener sponsored noreferrer">
            {ad.provider.title}
          </a>
        )}
      </div>
      {ad.viewUrl &&
        ad.viewUrl
          .split('||')
          .map((viewUrl, i) => <img key={i} src={viewUrl} className="hidden" alt="" />)}
    </>
  )
}
