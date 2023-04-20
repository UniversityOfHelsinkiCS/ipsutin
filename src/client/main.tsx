import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import CssBaseline from '@mui/material/CssBaseline'

import queryClient from './util/queryClient'
import initializeI18n from './util/il18n'

import App from './App'

initializeI18n()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CssBaseline>
          <App />
        </CssBaseline>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)
