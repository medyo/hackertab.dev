import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import ConfigurationWrapper from './configuration/ConfigurationWrapper'

ReactDOM.render(
  <React.StrictMode>
    <ConfigurationWrapper>
      <App />
    </ConfigurationWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);