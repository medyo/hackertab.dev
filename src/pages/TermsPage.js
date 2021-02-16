import React from 'react';
import './Page.css';
import { RiArrowLeftFill } from 'react-icons/ri';
import { APP } from '../Constants'


export default function TermsPage ({ goToPage }) {
  return (
    <div className="Page">
      <h1 className="title">Terms and Conditions</h1>
      <p>We don't use cookies or any tracking sh*t</p>
      <p>The source code is completely published on <a href="#" onClick={() => window.open(APP.repository, "_blank")}>Github</a>, feel free to contribute</p>
      <button onClick={() => goToPage('home')}><RiArrowLeftFill className="buttonIcon" /> Go Home</button>
    </div>

  )
}