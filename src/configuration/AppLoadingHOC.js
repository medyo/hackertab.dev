import React, { useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'

export const AppLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setIsLoading] = useState(true)
    const setLoadingState = (isComponentLoading) => setIsLoading(isComponentLoading)

    return (
      <>
        {isLoading && (
          <div className="appLoading">
            <BeatLoader color={'#A9B2BD'} loading={true} size={15} />
          </div>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} isLoading={isLoading} />
      </>
    )
  }
  return HOC
}
