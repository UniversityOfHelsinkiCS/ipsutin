import { createBrowserRouter, Outlet } from 'react-router-dom'

import {
  IDEA_EVALUATION_DATA_KEY,
  IP_ASSESSMENT_DATA_KEY,
  LICENCES_DATA_KEY,
  PUBLIC_URL,
} from '../config'

import Admin from './components/Admin/Admin'
import RenderAnalytics from './components/Admin/Analytics/RenderAnalytics'
import Entry from './components/Admin/Entries/Entry'
import RenderEntries from './components/Admin/Entries/RenderEntries'
import RootBoundary from './components/Errors/RootBoundary'
import DefaultResultElements from './components/InteractiveForm/DefaultResultElements'
import IpAssessmentResultElements from './components/InteractiveForm/IpAssessmentResultElements'
import { ResultDataProvider } from './components/InteractiveForm/ResultDataContext'
import ResultsPage from './components/InteractiveForm/ResultsPage'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import IdeaEvaluation from './pages/IdeaEvaluation/IdeaEvaluation'
import InventorsAssistant from './pages/InventorsAssistant/InventorsAssistant'
import IpAssessment from './pages/IpAssessment/IpAssessment'
import Licences from './pages/Licences/Licences'
import MainPage from './pages/MainPage/MainPage'
import App from './App'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <RootBoundary />,
      children: [
        {
          path: '',
          element: <MainPage />,
          errorElement: <RootBoundary />,
        },
        {
          path: '/licences',
          element: (
            <ResultDataProvider dataKey={LICENCES_DATA_KEY}>
              <Outlet />
            </ResultDataProvider>
          ),
          errorElement: <RootBoundary />,
          children: [
            {
              index: true,
              element: <Licences />,
            },
            {
              path: 'results',
              element: (
                <ResultsPage
                  surveyName='licences'
                  ResultElements={DefaultResultElements}
                />
              ),
            },
          ],
        },
        {
          path: '/ipassessment',
          element: (
            <ResultDataProvider dataKey={IP_ASSESSMENT_DATA_KEY}>
              <Outlet />
            </ResultDataProvider>
          ),
          errorElement: <RootBoundary />,
          children: [
            {
              index: true,
              element: <IpAssessment />,
            },
            {
              path: 'results',
              element: (
                <ResultsPage
                  surveyName='ipAssessment'
                  ResultElements={IpAssessmentResultElements}
                />
              ),
            },
          ],
        },
        {
          path: '/ideaevaluation',
          element: (
            <ResultDataProvider dataKey={IDEA_EVALUATION_DATA_KEY}>
              <Outlet />
            </ResultDataProvider>
          ),
          errorElement: <RootBoundary />,
          children: [
            {
              index: true,
              element: <IdeaEvaluation />,
            },
            {
              path: 'results',
              element: (
                <ResultsPage
                  surveyName='ideaEvaluation'
                  ResultElements={DefaultResultElements}
                />
              ),
            },
          ],
        },
        {
          path: '/inventorsassistant',
          element: <InventorsAssistant />,
          errorElement: <RootBoundary />,
        },
        {
          path: '/admin',
          element: <Admin />,
          errorElement: <RootBoundary />,
          children: [
            {
              index: true,
              element: <RenderAnalytics />,
            },
            {
              path: 'entries',
              element: <RenderEntries />,
            },
            {
              path: 'entries/view/:entryId',
              element: <Entry />,
            },
          ],
        },
        {
          path: 'about',
          element: <About />,
          errorElement: <RootBoundary />,
        },
        {
          path: 'contact',
          element: <Contact />,
          errorElement: <RootBoundary />,
        },
      ],
    },
  ],
  {
    basename: PUBLIC_URL,
  }
)

export default router
