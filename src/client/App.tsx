import React from 'react'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

import Footer from './components/Footer'
import MainPage from './components/MainPage/MainPage'
import NavBar from './components/NavBar/NavBar'
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
          <NavBar />
          <Box
            flexGrow={1}
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='50vh'
          >
            <MainPage />
          </Box>
          <Footer />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
