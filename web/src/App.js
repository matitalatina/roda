import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import NotFoundPage from './pages/NotFoundPage'
import HistoryPage from './pages/HistoryPage'
import theme from './themes/default'
import './App.css'

const App = () => (
  <ThemeProvider theme={theme}>
    <Switch>
      <Route path="/" component={HistoryPage} exact />
      <Route component={NotFoundPage} />
    </Switch>
  </ThemeProvider>
)

export default App
