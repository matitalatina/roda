import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import 'font-awesome/css/font-awesome.css'

import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { basename } from './config'

ReactDOM.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
  , document.getElementById('root')
)
registerServiceWorker()
