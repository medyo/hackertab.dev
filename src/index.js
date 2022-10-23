import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import AppWrapper from './configuration/AppWrapper'
import AppErrorBoundary from './configuration/AppErrorBoundary'
import ConfigurationWrapper from './configuration/ConfigurationWrapper'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from 'src/lib/react-query'

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