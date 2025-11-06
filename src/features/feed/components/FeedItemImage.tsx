import { useState } from 'react'
import { BiNews } from 'react-icons/bi'

type FeedItemImageProps = {
  imageUrl?: string
  fallbackImage?: string | React.ReactNode
}

export const FeedItemImage = ({ imageUrl, fallbackImage }: FeedItemImageProps) => {
  const [hasError, setHasError] = useState(false)

  if (hasError || !imageUrl) {
    if (typeof fallbackImage === 'string') {
      return <img src={fallbackImage} loading="lazy" className="rowCover" alt="" />
    } else {
      return (
        fallbackImage || (
          <div className="rowCover placeholder">
            <BiNews size={52} />
            <span>Cover image not found</span>
          </div>
        )
      )
    }
  }

  return (
    <img
      src={imageUrl}
      className="rowCover"
      loading="lazy"
      alt=""
      onError={(e) => {
        e.currentTarget.onerror = null
        setHasError(true)
      }}
    />
  )
}
