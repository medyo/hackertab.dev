import React from 'react'
import { APP } from '../Constants';
import { RiCodeSSlashFill } from "react-icons/ri"
import { trackPageView } from "../utils/Analytics"
import { AiFillHeart } from "react-icons/ai"
import { HiLightBulb } from "react-icons/hi"


function Footer({ setCurrentPage, feedbackWidget }) {

  const { show: showFeedbackWidget } = feedbackWidget || { show: false };

  const onSourceCodeClick = () => {
    trackPageView('source code')
    window.open(APP.repository, "_blank")
  }

  const onBuyCoffeeClick = () => {
    window.open(APP.donationLink)
  }

  const onNewFeatureRequest = () => {
    window.open(APP.supportLink)
  }

  return (
    <footer className="AppFooter">
      {
        showFeedbackWidget && <a className="linkItem" href="#" onClick={(e) => onNewFeatureRequest(e) }><HiLightBulb className="linkItemIcon" /> New Feature?</a>
      }
      <a className="linkItem" href="#" onClick={() => onBuyCoffeeClick()}><AiFillHeart className="linkItemIcon" /> Donate</a>
      <a className="linkItem" href="#" onClick={() => onSourceCodeClick()}><RiCodeSSlashFill className="linkItemIcon" /> Source code</a>
      <a className="linkItem" href="#" onClick={() => setCurrentPage('terms')}>{`Terms & conditions`}</a>
      <a className="linkItem" href="#" onClick={() => setCurrentPage('privacy')}>Privacy policy</a>
      <a className="linkItem" href="#" onClick={() => setCurrentPage('dataSource')}>Data sources</a>
    </footer>
  )
}

export default Footer;
