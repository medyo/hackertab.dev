import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import 'src/assets/index.css'
import { ConfigurationWrapper } from 'src/features/remoteConfig/'
import { persister, queryClient } from 'src/lib/react-query'
import { AppErrorBoundary } from 'src/providers/AppErrorBoundary'
import { AppRoutes } from './routes/AppRoutes'

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: persister }}>
        <ConfigurationWrapper>
          <AppRoutes />
        </ConfigurationWrapper>
      </PersistQueryClientProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
