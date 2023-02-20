import { HiLightBulb } from 'react-icons/hi'
import { RiCodeSSlashFill } from 'react-icons/ri'
import { privacyPolicyLink, repository, supportLink, termsAndConditionsLink } from 'src/config'
import { trackPageView } from 'src/lib/analytics'
import { getAppVersion } from 'src/utils/Os'

export const Footer = () => {
  const appVersion = getAppVersion()
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
      {appVersion && (
        <a
          className="linkItem"
          href={repository}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackPageView('Source Code')}>
          v{appVersion}
        </a>
      )}
    </footer>
  )
}
