import { ReactNode } from 'react'
import { Placeholder } from 'src/components/placeholders'
import { ListComponentPropsType } from './types'
// import CarbonAd from 'src/features/carbonAds'

export function ListComponent(props: ListComponentPropsType) {
  const { items, isLoading, error, renderItem, withAds, placeholder = <Placeholder /> } = props

  if (error) {
    return <p className="errorMsg">{error.message}</p>
  }

  const renderItems = () => {
    if (!items) {
      return
    }

    return items.map((item, index) => {
      let content:ReactNode[] = [renderItem(item, index)]
      // if (withAds && index === 0) {
      //   content.unshift(<CarbonAd />)
      // }
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

  return <>{isLoading ? <Placeholders /> : renderItems()}</>
}
