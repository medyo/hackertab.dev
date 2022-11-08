import React from 'react'
import { useAsyncError } from 'src/hooks/useAsyncError'
import { useGetRemoteConfig } from '../api/getRemoteConfig'
import BeatLoader from 'react-spinners/BeatLoader'

type ConfigurationWrapperProps = {
  children: React.ReactNode
}

export const ConfigurationWrapper = ({ children }: ConfigurationWrapperProps) => {
  const {
    isLoading,
    isError,
    data: remoteConfig,
  } = useGetRemoteConfig({
    config: {
      staleTime: 3600000, //1 Hour
      cacheTime: 86400000, // 1 Day
    },
  })
  const throwError = useAsyncError()

  if (isLoading) {
    return (
      <div className="appLoading">
        <BeatLoader color={'#A9B2BD'} loading={true} size={15} />
      </div>
    )
  }

  if (isError || !remoteConfig) {
    throwError('Could not fetch configuration data, Make sure you are connected to the internet')
  }

  return <>{children}</>
}
