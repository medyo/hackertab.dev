import * as Sentry from '@sentry/react'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import 'normalize.css'
import 'react-simple-toasts/dist/style.css'
import 'src/assets/index.css'
import { ConfigurationWrapper } from 'src/features/remoteConfig/'
import { persister, queryClient } from 'src/lib/react-query'
import { AppErrorBoundary } from 'src/providers/AppErrorBoundary'
import { AppRoutes } from './routes/AppRoutes'

import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/zoom.css'
import { createRoot } from 'react-dom/client'
import { initSentry } from './lib/sentry'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Failed to find the root element')
}

initSentry()
const root = createRoot(container)
root.render(
  <Sentry.ErrorBoundary
    fallback={({ error, resetError }) => (
      <AppErrorBoundary error={error} resetError={resetError} />
    )}>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: persister }}>
      <ConfigurationWrapper>
        <AppRoutes />
      </ConfigurationWrapper>
    </PersistQueryClientProvider>
  </Sentry.ErrorBoundary>
)
