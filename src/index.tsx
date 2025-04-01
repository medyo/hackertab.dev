import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import 'normalize.css'
import 'react-simple-toasts/dist/style.css'
import 'src/assets/index.css'
import { ConfigurationWrapper } from 'src/features/remoteConfig/'
import { persister, queryClient } from 'src/lib/react-query'
import { AppErrorBoundary } from 'src/providers/AppErrorBoundary'
import { AppRoutes } from './routes/AppRoutes'

import { createRoot } from 'react-dom/client'
const container = document.getElementById('root')
if (!container) {
  throw new Error('Failed to find the root element')
}
const root = createRoot(container)
root.render(
  <AppErrorBoundary>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: persister }}>
      <ConfigurationWrapper>
        <AppRoutes />
      </ConfigurationWrapper>
    </PersistQueryClientProvider>
  </AppErrorBoundary>
)
