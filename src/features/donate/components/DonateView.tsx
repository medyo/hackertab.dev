import { useEffect } from 'react'
import { FaCrown } from 'react-icons/fa'
import { TbCheck } from 'react-icons/tb'
import { Button } from 'src/components/Elements'
import { useRemoteConfigStore } from 'src/features/remoteConfig'
import { trackMarketingCampaignOpen, trackMarketingCampaignView } from 'src/lib/analytics'

type DonateViewProps = {
  setModalOpen: (open: boolean) => void
}
export const DonateView = ({ setModalOpen }: DonateViewProps) => {
  const { paywall } = useRemoteConfigStore()

  useEffect(() => {
    if (paywall?.id) {
      trackMarketingCampaignView(paywall.id, {
        source: 'modal',
      })
    }
  }, [paywall?.id])

  if (!paywall) {
    return null
  }
  const { headerImage, ctaUrl, cta, leadDescription, caption, features } = paywall
  return (
    <div className="donateView">
      <header>
        <img src={headerImage} alt="Header img" />
      </header>
      <div className="body">
        <p className="leadDescription">{leadDescription}</p>
        <p className="description">
          <b>What you get</b>
          <ul className="features">
            {features.map((feature, index) => {
              return (
                <li key={index}>
                  <TbCheck className="checkIcon" /> {feature}
                </li>
              )
            }) || []}
          </ul>
        </p>
        <div className="buttonsWrapper">
          <Button size="medium" className="cancelButton" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>

          <Button
            size="medium"
            className="upgradeButton"
            startIcon={<FaCrown />}
            onClick={() => {
              window.open(ctaUrl, '_blank')
              trackMarketingCampaignOpen(paywall.id, {
                source: 'modal',
              })
              setModalOpen(false)
            }}>
            {cta}
          </Button>
        </div>
        <p className="caption">{caption}</p>
      </div>
    </div>
  )
}
