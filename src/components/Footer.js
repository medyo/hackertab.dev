import React, { useEffect } from 'react'
import { APP } from '../Constants';
import { RiCodeSSlashFill } from "react-icons/ri"
import { trackPageView } from "../utils/Analytics"
import { AiFillHeart } from "react-icons/ai"
import { HiLightBulb } from "react-icons/hi"


function Footer({ setCurrentPage, feedbackWidget }) {

  const { show: showFeedbackWidget } = feedbackWidget || { show: false };

  useEffect(() => {
    if (showFeedbackWidget) {

      if (!process.env.REACT_APP_SUPPORT_WIDGET_ID) {
        console.log("Missing Feedback Widget ID")
        return
      }

      const script = document.createElement("script");
      script.src = `https://w.appzi.io/bootstrap/bundle.js?token=${process.env.REACT_APP_SUPPORT_WIDGET_ID}`;
      script.async = true;
      script.id = "_appzi"
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script);
      }
    }
  }, [])

  
  const onSourceCodeClick = () => {
    trackPageView('source code')
    window.open(APP.repository, "_blank")
  }

  const onBuyCoffeeClick = () => {
    window.open(APP.donationLink)
  }

  const onNewFeatureRequest = () => {
    if (window.appzi) {
      window.appzi.openWidget('4d0bdd40-c134-4d77-9b6c-5e0d6495917a')
    }
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