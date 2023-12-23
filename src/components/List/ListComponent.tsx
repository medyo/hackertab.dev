import React, { ReactNode, useEffect } from 'react'
import { Placeholder } from 'src/components/placeholders'
import { MAX_ITEMS_PER_CARD } from 'src/config'
import { BannerAd } from 'src/features/ads'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { BaseEntry } from 'src/types'

type PlaceholdersProps = {
  placeholder: ReactNode
}

const Placeholders = React.memo<PlaceholdersProps>(({ placeholder }) => {
  return (
    <>
      {[...Array(7)].map((x, i) => (
        <span key={i}>{placeholder}</span>
      ))}
    </>
  )
})

export type ListComponentPropsType<T extends BaseEntry> = {
  items: T[]
  isLoading: boolean
  renderItem: (item: T, index: number) => React.ReactNode
  withAds: boolean
  placeholder?: React.ReactNode
  header?: React.ReactNode
  refresh?: boolean
  error?: any
  limit?: number
}

export function ListComponent<T extends BaseEntry>(props: ListComponentPropsType<T>) {
  const {
    items,
    isLoading,
    error,
    renderItem,
    withAds,
    header,
    placeholder = <Placeholder />,
    limit = MAX_ITEMS_PER_CARD,
  } = props
  const { adsConfig } = useRemoteConfigStore()
  const [canAdsLoad, setCanAdsLoad] = React.useState(true)

  useEffect(() => {
    if (!adsConfig.enabled || !withAds) {
      return
    }

    const handleClassChange = () => {
      if (document.documentElement.classList.contains('dndState')) {
        setCanAdsLoad(false)
      } else {
        setCanAdsLoad(true)
      }
    }

    const observer = new MutationObserver(handleClassChange)
    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
    }
  }, [withAds, adsConfig.enabled])

  if (error) {
    return <p className="errorMsg">{error?.message || error}</p>
  }

  const renderItems = () => {
    if (!items) {
      return
    }

    return items.slice(0, limit).map((item, index) => {
      let content: ReactNode[] = [renderItem(item, index)]
      if (header && index === 0) {
        content.unshift(header)
      }

      if (canAdsLoad && adsConfig.enabled && withAds && index === adsConfig.rowPosition) {
        content.unshift(<BannerAd key={'banner-ad'} />)
      }

      return content
    })
  }

  return <>{isLoading ? <Placeholders placeholder={placeholder} /> : renderItems()}</>
}
