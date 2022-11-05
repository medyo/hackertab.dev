import React from 'react'
import {
  repository,
  supportLink,
  privacyPolicyLink,
  termsAndConditionsLink,
  dataSourcesLink,
} from 'src/config'
import { RiCodeSSlashFill } from 'react-icons/ri'
import { HiLightBulb } from 'react-icons/hi'
import { trackPageView } from 'src/lib/analytics'

export const Footer = () => {
  const onSourceCodeClick = () => {
    trackPageView('Source Code')
    window.open(repository, '_blank')
  }

  const onNewFeatureRequest = () => {
    trackPageView('Feature Request')
    window.open(supportLink)
  }

  const onPrivacyPolicyClick = () => {
    trackPageView('Privacy Policy')
    window.open(privacyPolicyLink)
  }
  const onTermsClick = () => {
    trackPageView('Terms And Conditions')
    window.open(termsAndConditionsLink)
  }
  const onDataSourcesClick = () => {
    trackPageView('Data Sources')
    window.open(dataSourcesLink)
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
