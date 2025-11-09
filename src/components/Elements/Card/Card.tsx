import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { AdvBanner } from 'src/features/adv'
import { DesktopBreakpoint } from 'src/providers/DesktopBreakpoint'
import { MobileBreakpoint } from 'src/providers/MobileBreakpoint'
import { CardPropsType } from 'src/types'

type RootCardProps = CardPropsType & {
  children: React.ReactNode
  titleComponent?: React.ReactNode
  settingsComponent?: React.ReactNode
  fullBlock?: boolean
}

export const Card = ({
  meta,
  titleComponent,
  settingsComponent,
  className,
  withAds = false,
  children,
  fullBlock = false,
  knob,
}: RootCardProps) => {
  const { icon, label, badge } = meta
  const [canAdsLoad, setCanAdsLoad] = useState(true)

  useEffect(() => {
    if (!withAds) {
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
  }, [withAds])

  return (
    <div className={clsx('block', fullBlock && 'fullBlock', className)}>
      <MobileBreakpoint>
        {settingsComponent && <button className="floatingFilter">{settingsComponent}</button>}
      </MobileBreakpoint>
      <div className="blockHeader">
        {knob}
        <span className="blockHeaderIcon">{icon}</span> {titleComponent || label}{' '}
        <DesktopBreakpoint>
          {settingsComponent && (
            <span className="blockHeaderSettingsButton">{settingsComponent}</span>
          )}
        </DesktopBreakpoint>
        {badge && <span className="blockHeaderBadge">{badge}</span>}
      </div>

      {canAdsLoad && withAds && (
        <div className="ad-wrapper blockRow">
          <AdvBanner />
        </div>
      )}

      <div className="blockContent scrollable">{children}</div>
    </div>
  )
}
