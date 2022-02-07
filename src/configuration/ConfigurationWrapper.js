import React, { useEffect, useState } from 'react'
import remoteConfigurationApi from '../services/remoteConfiguration'
import { ConfigurationProvider } from './ConfigurationContext'
import { AppLoadingHOC } from './AppLoadingHOC'
import useAsyncError from '../hooks/useAsyncError'

export const ConfigurationWrapper = (props) => {
  const { setLoading, isLoading } = props
  const [configurationData, setConfigurationData] = useState(null)
  const throwError = useAsyncError()

  useEffect(() => {
    setLoading(true)
    const setup = async () => {
      // try {
      const data = await remoteConfigurationApi.getRemoteConfiguration()
      if (!data) {
        throwError(
          'Could not fetch configuration data, Make sure you are connected to the internet'
        )
      } else {
        setConfigurationData(data)
      }
      setLoading(false)
    }

    setup()
  }, [])

  return (
    <>
      {configurationData && (
        <ConfigurationProvider value={configurationData}>{props.children}</ConfigurationProvider>
      )}
    </>
  )
}

export default AppLoadingHOC(ConfigurationWrapper)
