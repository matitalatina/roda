import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { basename } from './config'
import { injectGlobal, ThemeProvider } from 'styled-components'
import NotFoundPage from './components/pages/NotFoundPage'
import HistoryPage from './components/pages/HistoryPage'
import theme from './components/themes/default'
import './App.css'

const App = () => (
  <BrowserRouter basename={basename}>
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={HistoryPage} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
