import React, { useEffect, useState } from 'react'
import { SortableKnob } from 'react-easy-sort'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { ref } from 'src/config'
import { AdvBanner } from 'src/features/adv'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { DesktopBreakpoint } from 'src/providers/DesktopBreakpoint'
import { useUserPreferences } from 'src/stores/preferences'
import { SupportedCardType } from 'src/types'

type CardProps = {
  children: React.ReactNode
  card: SupportedCardType
  withAds?: boolean
  titleComponent?: React.ReactNode
  fullBlock?: boolean
}

export const Card = ({
  card,
  titleComponent,
  withAds = false,
  children,
  fullBlock = false,
}: CardProps) => {
  const { openLinksNewTab } = useUserPreferences()
  const { link, icon, label, badge } = card
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
    <div className={'block' + (fullBlock ? ' fullBlock' : '')}>
      <div className="blockHeader">
        <DesktopBreakpoint>
          <SortableKnob>
            <button className="blockHeaderDragButton">
              <MdOutlineDragIndicator />
            </button>
          </SortableKnob>
        </DesktopBreakpoint>
        <span className="blockHeaderIcon">{icon}</span> {titleComponent || label}{' '}
        {link && (
          <a className="blockHeaderLink" href={link} onClick={handleHeaderLinkClick}>
            <BsBoxArrowInUpRight />
          </a>
        )}
        {badge && <span className="blockHeaderBadge">{badge}</span>}
      </div>

      {canAdsLoad && adsConfig.enabled && withAds && <AdvBanner />}

      <div className="blockContent scrollable">{children}</div>
    </div>
  )
}
