import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { ref } from 'src/config'
import { AdvBanner } from 'src/features/adv'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { useUserPreferences } from 'src/stores/preferences'
import { CardPropsType } from 'src/types'

type RootCardProps = CardPropsType & {
  children: React.ReactNode
  titleComponent?: React.ReactNode
  fullBlock?: boolean
}

export const Card = ({
  meta,
  titleComponent,
  className,
  withAds = false,
  children,
  fullBlock = false,
  knob,
}: RootCardProps) => {
  const { openLinksNewTab } = useUserPreferences()
  const { link, icon, label, badge } = meta
  const [canAdsLoad, setCanAdsLoad] = useState(true)
  const { adsConfig } = useRemoteConfigStore()

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

  const handleHeaderLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    let url = `${link}?${ref}`
    window.open(url, openLinksNewTab ? '_blank' : '_self')
  }

  return (
    <div className={clsx('block', fullBlock && 'fullBlock', className)}>
      <div className="blockHeader">
        {knob}
        <span className="blockHeaderIcon">{icon}</span> {titleComponent || label}{' '}
        {link && (
          <a className="blockHeaderLink" href={link} onClick={handleHeaderLinkClick}>
            <BsBoxArrowInUpRight />
          </a>
        )}
        {badge && <span className="blockHeaderBadge">{badge}</span>}
      </div>

      {canAdsLoad && adsConfig.enabled && withAds && (
        <div className="ad-wrapper blockRow">
          <AdvBanner />
        </div>
      )}

      <div className="blockContent scrollable">{children}</div>
    </div>
  )
}
