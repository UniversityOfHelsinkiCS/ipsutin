import { createBrowserRouter, Outlet } from 'react-router-dom'

import {
  IDEA_EVALUATION_DATA_KEY,
  IP_ASSESSMENT_DATA_KEY,
  LICENCES_DATA_KEY,
  PUBLIC_URL,
} from '../../../config'
import App from '../../App'
import IdeaEvaluation from '../../pages/IdeaEvaluation/IdeaEvaluation'
import IdeaEvaluationResults from '../../pages/IdeaEvaluation/IdeaEvaluationResults'
import IpAssessment from '../../pages/IpAssessment/IpAssessment'
import IpAssessmentResults from '../../pages/IpAssessment/IpAssessmentResults'
import LicenceResults from '../../pages/Licences/LicenceResults'
import Licences from '../../pages/Licences/Licences'
import MainPage from '../../pages/MainPage/MainPage'
import Admin from '../Admin/Admin'
import RenderAnalytics from '../Admin/Analytics/RenderAnalytics'
import Entry from '../Admin/Entries/Entry'
import RenderEntries from '../Admin/Entries/RenderEntries'
import { ResultDataProvider } from '../InteractiveForm/ResultDataContext'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <MainPage />,
        },
        {
          path: '/licences',
          element: (
            <ResultDataProvider dataKey={LICENCES_DATA_KEY}>
              <Outlet />
            </ResultDataProvider>
          ),
          children: [
            {
              index: true,
              element: <Licences />,
            },
            {
              path: 'results',
              element: <LicenceResults />,
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
          children: [
            {
              index: true,
              element: <IpAssessment />,
            },
            {
              path: 'results',
              element: <IpAssessmentResults />,
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
          children: [
            {
              index: true,
              element: <IdeaEvaluation />,
            },
            {
              path: 'results',
              element: <IdeaEvaluationResults />,
            },
          ],
        },
        {
          path: '/admin',
          element: <Admin />,
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
      ],
    },
  ],
  {
    basename: PUBLIC_URL,
  }
)

export default router
