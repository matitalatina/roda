import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { basename } from './config'
import { injectGlobal, ThemeProvider } from 'styled-components'
import NotFoundPage from './pages/NotFoundPage'
import HistoryPage from './pages/HistoryPage'
import theme from './themes/default'
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
