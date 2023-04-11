import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import { SnackbarProvider } from 'notistack'

import Footer from './components/Footer'

import useTheme from './theme'

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
          <Box
            flexGrow={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <p>Hello world!</p>
          </Box>
          <Footer />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
