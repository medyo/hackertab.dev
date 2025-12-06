import React, { useEffect } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { useAsyncError } from 'src/hooks/useAsyncError'
import { useGetRemoteConfig } from '../api/getRemoteConfig'
import { useRemoteConfigStore } from '../stores/remoteConfig'

type ConfigurationWrapperProps = {
  children: React.ReactNode
}

export const ConfigurationWrapper = ({ children }: ConfigurationWrapperProps) => {
  const setRemoteConfig = useRemoteConfigStore((s) => s.setRemoteConfig)

  const {
    isLoading,
    isError,
    error,
    data: remoteConfig,
  } = useGetRemoteConfig({
    config: {
      staleTime: 3600000, //1 Hour
      cacheTime: 86400000, // 1 Day
    },
  })
  const throwError = useAsyncError()

  useEffect(() => {
    if (remoteConfig) {
      setRemoteConfig(remoteConfig)
    }
  }, [remoteConfig, setRemoteConfig])

  if (isLoading) {
    return (
      <div className="appLoading">
        <BeatLoader color={'#A9B2BD'} loading={true} size={15} />
      </div>
    )
  }

  if (isError || !remoteConfig) {
    throwError(
      error ?? 'Could not fetch configuration data, Make sure you are connected to the internet.'
    )
  }

  return <>{children}</>
}
