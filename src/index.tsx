import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BeatLoader } from 'react-spinners'
import 'src/assets/index.css'
import { ConfigurationWrapper } from 'src/features/remoteConfig/'
import { persister, queryClient } from 'src/lib/react-query'
import { AppErrorBoundary } from 'src/providers/AppErrorBoundary'
import { lazyImport } from './utils/lazyImport'

const { App } = lazyImport(() => import('./App'), 'App')

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: persister }}>
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
      </PersistQueryClientProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
