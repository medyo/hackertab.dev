import React from 'react'
import { ErrorBoundary} from 'react-error-boundary'
import { AiFillBug } from 'react-icons/ai'
import { WiRefresh } from 'react-icons/wi'

export const AppErrorBoundary = ({ children }: {children: React.ReactNode}) => {
  
  const ErrorFallback = ({ error, resetErrorBoundary }: {error: Error, resetErrorBoundary: () => void}) => {
    return (
      <div className="Page appError">
        <AiFillBug size={64} />
        <p>Sorry there was a problem loading this page.</p>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>
          <WiRefresh size={32} className={'buttonIcon'} /> Try again
        </button>
      </div>
    )
  }

  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}
