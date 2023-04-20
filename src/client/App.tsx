import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import Footer from './components/Footer'
import NavBar from './components/NavBar/NavBar'

import useTheme from './theme'
import Router from './Router'

const App = () => {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider preventDuplicate>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <NavBar />
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <Router />
          </Box>
          <Footer />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
