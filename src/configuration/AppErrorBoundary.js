import React, { useContext } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { AiFillBug } from 'react-icons/ai'
import { WiRefresh } from 'react-icons/wi'
import '../pages/Page.css'

export default function AppErrorBoundary({ children }) {
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div className="Page appError">
        <AiFillBug size={64} />
        <p>Sorry there was a problem loading this page.</p>
        <p>{error}</p>
        <button onClick={resetErrorBoundary}>
          <WiRefresh size={32} className={'buttonIcon'} /> Try again
        </button>
      </div>
    )
  }

  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}
