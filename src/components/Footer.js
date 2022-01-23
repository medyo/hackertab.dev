import React from 'react'
import { APP } from '../Constants';
import { RiCodeSSlashFill } from "react-icons/ri"
import { trackPageView } from '../utils/Analytics'
import { HiLightBulb } from 'react-icons/hi'

function Footer({ feedbackWidget }) {
  const { show: showFeedbackWidget } = feedbackWidget || { show: false }

  const onSourceCodeClick = () => {
    trackPageView('source code')
    window.open(APP.repository, '_blank')
  }

  const onNewFeatureRequest = () => {
    trackPageView('feature request')
    window.open(APP.supportLink)
  }

  const onPrivacyPolicyClick = () => {
    trackPageView('privacy policy')
    window.open(APP.privacyPolicyLink)
  }
  const onTermsClick = () => {
    trackPageView('terms and conditions')
    window.open(APP.termsAndConditionsLink)
  }
  const onDataSourcesClick = () => {
    trackPageView('data sources')
    window.open(APP.dataSourcesLink)
  }

  return (
    <footer className="AppFooter">
      {showFeedbackWidget && (
        <a className="linkItem" href="#" onClick={(e) => onNewFeatureRequest(e)}>
          <HiLightBulb className="linkItemIcon" /> New Feature?
        </a>
      )}
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

export default Footer;
