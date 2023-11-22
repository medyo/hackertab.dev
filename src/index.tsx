import { QueryClientProvider } from '@tanstack/react-query'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BeatLoader } from 'react-spinners'
import 'src/assets/index.css'
import { ConfigurationWrapper } from 'src/features/remoteConfig/'
import { queryClient } from 'src/lib/react-query'
import { AppErrorBoundary } from 'src/providers/AppErrorBoundary'
import { lazyImport } from './utils/lazyImport'

const { App } = lazyImport(() => import('./App'), 'App')

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ConfigurationWrapper>
          <React.Suspense
            fallback={
              <div className="appLoading">
                <BeatLoader color={'#A9B2BD'} loading={true} size={15} />
              </div>
            }>
            <App />
          </React.Suspense>
        </ConfigurationWrapper>
      </QueryClientProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
