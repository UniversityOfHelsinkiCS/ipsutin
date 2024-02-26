import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

import { FULL_URL } from '../config'

import Footer from './components/Footer'
import NavBar from './components/NavBar/NavBar'
import { useLoggedInUser } from './hooks/useUser'
import { IdeaEvaluationResultDataProvider } from './pages/IdeaEvaluation/IdeaEvaluationResultContext'
import { IpAssessmentResultDataProvider } from './pages/IpAssessment/IpAssessmentResultDataContext'
import { LicenceResultDataProvider } from './pages/Licences/LicenceResultDataContext'
import useTheme from './theme'

const App = () => {
  const theme = useTheme()
  const { user, isLoading } = useLoggedInUser()

  if (isLoading) return null

  if (!user?.id) {
    window.location.href = `${FULL_URL}/api/login`
    return null
  }

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
            minHeight='50vh'
          >
            <LicenceResultDataProvider>
              <IdeaEvaluationResultDataProvider>
                <IpAssessmentResultDataProvider>
                  <Outlet />
                </IpAssessmentResultDataProvider>
              </IdeaEvaluationResultDataProvider>
            </LicenceResultDataProvider>
          </Box>
          <Footer />
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
