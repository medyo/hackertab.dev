import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import * as Panelbear from "@panelbear/panelbear-js";
import ConfigurationWrapper from './configuration/ConfigurationWrapper'

window.$analyticsEnabled = false

if (process.env.REACT_APP_PANELBEAR_SITEID) {
  Panelbear.load(process.env.REACT_APP_PANELBEAR_SITEID, {
    debug: process.env.NODE_ENV !== 'production'
  });
  window.$analyticsEnabled = true
}

ReactDOM.render(
  <React.StrictMode>
    <ConfigurationWrapper>
      <App />
    </ConfigurationWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);