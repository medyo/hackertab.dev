import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import AppWrapper from './configuration/AppWrapper'
import AppErrorBoundary from './configuration/AppErrorBoundary'
import ConfigurationWrapper from './configuration/ConfigurationWrapper'

ReactDOM.render(
  <React.StrictMode>
    <AppErrorBoundary>
      <ConfigurationWrapper>
        <AppWrapper>
          <App />
        </AppWrapper>
      </ConfigurationWrapper>
    </AppErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)