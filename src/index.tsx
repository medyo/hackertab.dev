import { QueryClientProvider } from '@tanstack/react-query'
import 'normalize.css'
import React from 'react'
import ReactDOM from 'react-dom'
import 'src/assets/index.css'
import { ConfigurationWrapper } from 'src/features/remoteConfig/'
import { queryClient } from 'src/lib/react-query'
import { AppErrorBoundary } from 'src/providers/AppErrorBoundary'
import AppWrapper from 'src/providers/AppWrapper'
import { App } from './App'

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ConfigurationWrapper>
          <AppWrapper>
            <App />
          </AppWrapper>
        </ConfigurationWrapper>
      </QueryClientProvider>
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)
