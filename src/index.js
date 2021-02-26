import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Panelbear from "@panelbear/panelbear-js";

import ConfigurationWrapper from './ConfigurationWrapper'

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
