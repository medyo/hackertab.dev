import React, { useState, useEffect } from 'react'
import CarbonAd from './CarbonAd'
import { trackException } from '../utils/Analytics'
import Placeholder from './Placeholder'

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
    } catch (e) {
      setError(e)
      trackException(e, true)
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

  function CustomPlaceholder() {
    return (
      <>
        {[...Array(5)].map((x, i) => (
          <Placeholder key={i} />
        ))}
      </>
    )
  }

  return <>{loading ? <CustomPlaceholder /> : renderItems()}</>
}

export default ListComponent
