import React, { useState, useEffect } from 'react'
import CarbonAd from '../features/carbonAds/components/CarbonAd'
import Placeholder from './Placeholder'

function ListComponent({ fetchData, refresh, renderItem, withAds, placeholder = <Placeholder /> }) {
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
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetch()
  }, [refresh])

  if (error) {
    return <p className="errorMsg">{error.message}</p>
  }

  const renderItems = () => {
    if (!items) {
      return
    }

    return items.map((item, index) => {
      let content = [renderItem(item, index)]
      if (withAds && index == 0) {
        content.unshift(<CarbonAd key={'carbonAd0'} />)
      }
      return content
    })
  }

  function Placeholders() {
    return (
      <>
        {[...Array(5)].map((x, i) => (
          <span key={i}>{placeholder}</span>
        ))}
      </>
    )
  }

  return <>{loading ? <Placeholders /> : renderItems()}</>
}

export default ListComponent
