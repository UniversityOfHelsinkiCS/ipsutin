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
import InventorPhase1 from './pages/InventorsAssistant/InventorPhase1'
import InventorPhase2 from './pages/InventorsAssistant/InventorPhase2'
import InventorPhase3 from './pages/InventorsAssistant/InventorPhase3'
import { InventorsContextProvider } from './pages/InventorsAssistant/InventorsContext'
import IpAssessment from './pages/IpAssessment/IpAssessment'
import Licences from './pages/Licences/Licences'
import MainPage from './pages/MainPage/MainPage'
import ServicePage from './pages/Service/ServicePage'
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
          path: '/services',
          errorElement: <RootBoundary />,
          children: [
            {
              path: ':serviceId',
              element: <ServicePage />,
            },
          ],
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
          path: '/inventors-assistant',
          element: (
            <InventorsContextProvider>
              <Outlet />
            </InventorsContextProvider>
          ),
          errorElement: <RootBoundary />,
          children: [
            {
              index: true,
              element: <InventorPhase1 />,
            },
            {
              path: 'phase2',
              element: <InventorPhase2 />,
            },
            {
              path: 'phase3',
              element: <InventorPhase3 />,
            },
          ],
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
