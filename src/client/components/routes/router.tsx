import { createBrowserRouter } from 'react-router-dom'

import { PUBLIC_URL } from '../../../config'
import App from '../../App'
import Admin from '../Admin/Admin'
import RenderEntries from '../Admin/Entries/RenderEntries'
import IdeaEvaluation from '../IdeaEvaluation/IdeaEvaluation'
import IdeaEvaluationResults from '../IdeaEvaluation/IdeaEvaluationResults'
import IpAssessment from '../IpAssessment/IpAssessment'
import IpAssessmentResults from '../IpAssessment/IpAssessmentResults'
import LicenceResults from '../Licences/LicenceResults'
import Licences from '../Licences/Licences'
import MainPage from '../MainPage/MainPage'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <MainPage />,
          children: [
            {
              path: 'licences',
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
              path: 'ipassessment',
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
              path: 'ideaevaluation',
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
          ],
        },
        {
          path: '/admin',
          element: <Admin />,
          children: [
            {
              path: 'entries',
              element: <RenderEntries />,
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
