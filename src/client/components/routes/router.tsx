import { createBrowserRouter } from 'react-router-dom'

import { PUBLIC_URL } from '../../../config'
import App from '../../App'
import IdeaEvaluation from '../IdeaEvaluation/IdeaEvaluation'
import IdeaEvaluationResults from '../IdeaEvaluation/IdeaEvaluationResults'
import IpAssessment from '../IpAssessment/IpAssessment'
import IpAssessmentResults from '../IpAssessment/IpAssessmentResults'
import LicenceResults from '../Licences/LicenceResults'
import Licences from '../Licences/Licences'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
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
  ],
  {
    basename: PUBLIC_URL,
  }
)

export default router
