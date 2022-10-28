import React from 'react'
import { APP } from '../../Constants'
import { RiCodeSSlashFill } from 'react-icons/ri'
import { HiLightBulb } from 'react-icons/hi'
import { trackPageView } from 'src/lib/analytics'

export const Footer = () => {
  const onSourceCodeClick = () => {
    trackPageView('Source Code')
    window.open(APP.repository, '_blank')
  }

  const onNewFeatureRequest = () => {
    trackPageView('Feature Request')
    window.open(APP.supportLink)
  }

  const onPrivacyPolicyClick = () => {
    trackPageView('Privacy Policy')
    window.open(APP.privacyPolicyLink)
  }
  const onTermsClick = () => {
    trackPageView('Terms And Conditions')
    window.open(APP.termsAndConditionsLink)
  }
  const onDataSourcesClick = () => {
    trackPageView('Data Sources')
    window.open(APP.dataSourcesLink)
  }

  return (
    <footer className="AppFooter">
      <a className="linkItem" href="#" onClick={() => onNewFeatureRequest()}>
        <HiLightBulb className="linkItemIcon" /> New Feature?
      </a>
      <a className="linkItem" href="#" onClick={() => onSourceCodeClick()}>
        <RiCodeSSlashFill className="linkItemIcon" /> Source code
      </a>
      <a className="linkItem" href="#" onClick={() => onTermsClick()}>{`Terms & conditions`}</a>
      <a className="linkItem" href="#" onClick={() => onPrivacyPolicyClick()}>
        Privacy policy
      </a>
      <a className="linkItem" href="#" onClick={() => onDataSourcesClick()}>
        Data sources
      </a>
    </footer>
  )
}
