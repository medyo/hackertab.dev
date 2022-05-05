import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CarbonAd.css'
import { getBaseApi } from '../utils/DataUtils'

export default function CarbonAd() {
  const [ad, setAd] = useState()

  useEffect(() => {
    const setup = async () => {
      const userAgent = new URLSearchParams(navigator.userAgent).toString()
      const request = await axios.get(`${getBaseApi('')}/monetization/?useragent=${userAgent}`)
      if (request.data) {
        setAd(request.data.ads[0])
      }
    }
    setup()
  }, [])

  const prependHTTP = (url) => {
    url = decodeURIComponent(url)
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = 'https://' + url
    }
    return url
  }

  return (
    <div className="carbon-ad-wrapper blockRow">
      {ad && (
        <div id="carbonads">
          <span>
            <span className="carbon-wrap">
              <a
                href={prependHTTP(ad.statlink)}
                className="carbon-img"
                target="_blank"
                rel="noopener sponsored"
                title={ad.company + ' ' + ad.companyTagline}>
                <img
                  src={ad.smallImage}
                  border="0"
                  height="100"
                  width="130"
                  style={{ background: ad.backgroundColor }}
                />
              </a>

              <a
                href={prependHTTP(ad.statlink)}
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
