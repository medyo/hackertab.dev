import React, { useState, useEffect } from 'react'
import CarbonAd from './CarbonAd'
import { trackException } from '../utils/Analytics'
import Placeholder from './Placeholder'
import { Virtuoso } from 'react-virtuoso'

function ListHeader(withAds) {
  if (!withAds) {
    return null
  }
  return <CarbonAd key={'carbonAd0'} />
}

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

    return (
      <Virtuoso
        style={{ height: '71vh' }}
        className="blockContent scrollable"
        components={{ Header: () => ListHeader(withAds) }}
        data={items}
        itemContent={(index, item) => renderItem(item, index)}
      />
    )
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
