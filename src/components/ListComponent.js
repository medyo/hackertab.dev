import React, { useState, useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import CarbonAd from './CarbonAd'

function ListComponent({ fetchData, refresh, renderItem, withAds }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetch = async () => {
    setLoading(true)
    setError(null)
    setItems([])
    try {
      const data = await fetchData()
      setItems(data)
    }
    catch (e) {
      setError(e)
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetch()
  }, [refresh])

  if (error) {
    return (<p className="errorMsg">{error.message}</p>)
  }

  const renderItems = () => {
    if (!items || items.length == 0 ) {
      <p className="errorMsg">Could not find any content using the selected languages!</p>
    }
    return items.map((item, index) => {
      let content = [renderItem(item, index)]
      if(withAds && index == 0) {
        content.unshift(<CarbonAd key={'carbonAd0'} />)
      }
      return content
    })
  }

  return (
    <>
      {
        loading ?
          <div className="cardLoading">
            <BeatLoader color={"#A9B2BD"} loading={loading} size={15} className="loading" />
          </div> : renderItems()
      }

    </>
  )
}

export default ListComponent
