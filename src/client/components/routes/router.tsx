import { createBrowserRouter, Outlet } from 'react-router-dom'

import {
  IDEA_EVALUATION_DATA_KEY,
  IP_ASSESSMENT_DATA_KEY,
  LICENCES_DATA_KEY,
  PUBLIC_URL,
} from '../../../config'
import App from '../../App'
import About from '../../pages/About/About'
import IdeaEvaluation from '../../pages/IdeaEvaluation/IdeaEvaluation'
import InventorsAssistant from '../../pages/InventorsAssistant/InventorsAssistant'
import IpAssessment from '../../pages/IpAssessment/IpAssessment'
import Licences from '../../pages/Licences/Licences'
import MainPage from '../../pages/MainPage/MainPage'
import Admin from '../Admin/Admin'
import RenderAnalytics from '../Admin/Analytics/RenderAnalytics'
import Entry from '../Admin/Entries/Entry'
import RenderEntries from '../Admin/Entries/RenderEntries'
import DefaultResultElements from '../InteractiveForm/DefaultResultElements'
import IpAssessmentResultElements from '../InteractiveForm/IpAssessmentResultElements'
import { ResultDataProvider } from '../InteractiveForm/ResultDataContext'
import ResultsPage from '../InteractiveForm/ResultsPage'

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
        {
          path: 'about',
          element: <About />,
        },
        {
          path: '/inventorsassistant',
          element: <InventorsAssistant />,
        },
      ],
    },
  ],
  {
    basename: PUBLIC_URL,
  }
)

export default router
