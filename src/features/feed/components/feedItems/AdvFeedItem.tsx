import clsx from 'clsx'
import { useState } from 'react'
import { RiAdvertisementFill } from 'react-icons/ri'
import { Ad, AdvBanner } from 'src/features/adv'
import { AdFeedItemData, BaseItemPropsType } from 'src/types'

export const AdvFeedItem = ({ className }: BaseItemPropsType<AdFeedItemData>) => {
  const [adMeta, setAdMeta] = useState<Ad | null>()

  return (
    <div className={clsx('blockRow advFeed', className)}>
      <AdvBanner
        feedDisplay={true}
        onAdLoaded={setAdMeta}
        loadingState={
          <div className="placeholder">
            <div className="image"></div>
            <div className="line"></div>
            <div className="smallLine"></div>
          </div>
        }
      />
      {adMeta && (
        <>
          {adMeta.company && adMeta.companyTagline && (
            <div className="rowTitle">
              <span className="subTitle">
                {[adMeta.company, adMeta.companyTagline].filter(Boolean).join(' - ')}
              </span>
            </div>
          )}
          <div className="rowDetails">
            <span className="rowItem verticalAligned">
              <RiAdvertisementFill color="orange" size={16} /> {adMeta.provider.title}
            </span>
          </div>
        </>
      )}
    </div>
  )
}
