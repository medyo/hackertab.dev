import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CarbonAd.css'

export default function CarbonAd() {
  const [ad, setAd] = useState()
  const packageFile = require('../../package.json')

  useEffect(() => {
    const setup = async () => {
      const userAgent = new URLSearchParams(navigator.userAgent).toString()
      var baseUrl = process.env.NODE_ENV === 'production' ? packageFile.proxy : ''
      const request = await axios.get(`${baseUrl}/monetization/?useragent=${userAgent}`)
      if (request.data) {
        setAd(request.data.ads[0])
      }
    }
    setup()
  }, [])

  return (
    <div className="carbon-ad-wrapper blockRow">
      {ad && (
        <div id="carbonads">
          <span>
            <span className="carbon-wrap">
              <a
                href={ad.statlink}
                className="carbon-img"
                target="_blank"
                rel="noopener sponsored"
                title={ad.company + ' ' + ad.companyTagline}>
                <img
                  src={ad.smallImage}
                  alt="ads via Carbon"
                  border="0"
                  height="100"
                  width="130"
                  style={{ background: ad.backgroundColor }}
                />
              </a>

              <a
                href={ad.statlink}
                className="carbon-text"
                target="_blank"
                rel="noopener sponsored">
                {ad.description}
              </a>
            </span>

            <a
              href={ad.ad_via_link}
              className="carbon-poweredby"
              target="_blank"
              rel="noopener sponsored">
              ads via Carbon
            </a>
          </span>
        </div>
      )}
    </div>
  )
}
