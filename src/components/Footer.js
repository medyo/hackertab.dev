import React from 'react'
import { APP } from '../Constants';
import { RiCodeSSlashFill } from "react-icons/ri"

function Footer({ setCurrentPage }) {

  const onSourceCodeClick = () => {
    window.open(APP.repository, "_blank")
  }

  return (
    <footer className="AppFooter">
      <a className="linkItem" href="#" onClick={() => onSourceCodeClick()}><RiCodeSSlashFill className="linkItemIcon" /> Source code</a>
      <a className="linkItem" href="#" onClick={() => setCurrentPage('terms')}>{`Terms & conditions`}</a>
      <a className="linkItem" href="#" onClick={() => setCurrentPage('privacy')}>Privacy policy</a>
      <a className="linkItem" href="#" onClick={() => setCurrentPage('dataSource')}>Data sources</a>
    </footer>
  )
}

export default Footer;