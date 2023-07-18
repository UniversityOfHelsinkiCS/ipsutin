import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'

import router from './components/routes/router'
import initializeI18n from './util/il18n'
import queryClient from './util/queryClient'
import initializeSentry from './util/sentry'

initializeI18n()
initializeSentry()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CssBaseline>
        <RouterProvider router={router} />
      </CssBaseline>
      <ReactQueryDevtools position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>
)
