import React from 'react'
import ReactDOM from 'react-dom'

import 'font-awesome/css/font-awesome.css'
import 'react-select/dist/react-select.css'

import 'whatwg-fetch'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <App />
  , document.getElementById('root')
)
registerServiceWorker()
