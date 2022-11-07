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
  return (
    <footer className="AppFooter">
      <a className="linkItem" href={supportLink} onClick={() => trackPageView('Feature Request')}>
        <HiLightBulb className="linkItemIcon" /> New Feature?
      </a>
      <a
        className="linkItem"
        href={repository}
        target="_blank"
        onClick={() => trackPageView('Source Code')}
        rel="noreferrer">
        <RiCodeSSlashFill className="linkItemIcon" /> Source code
      </a>
      <a
        className="linkItem"
        href={termsAndConditionsLink}
        onClick={() => trackPageView('Terms And Conditions')}>{`Terms & conditions`}</a>
      <a
        className="linkItem"
        href={privacyPolicyLink}
        onClick={() => trackPageView('Privacy Policy')}>
        Privacy policy
      </a>
      <a className="linkItem" href={dataSourcesLink} onClick={() => trackPageView('Data Sources')}>
        Data sources
      </a>
    </footer>
  )
}
