import { createBrowserRouter } from 'react-router-dom'

import { PUBLIC_URL } from '../../../config'
import App from '../../App'
import IdeaEvaluation from '../IdeaEvaluation/IdeaEvaluation'
import IpAssessment from '../IpAssessment/IpAssessment'
import LicenseResults from '../Licenses/LicenseResults'
import Licences from '../Licenses/Licenses'

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
              element: <LicenseResults />,
            },
          ],
        },
        {
          path: 'ipassessment',
          element: <IpAssessment />,
        },
        {
          path: 'ideaevaluation',
          element: <IdeaEvaluation />,
        },
      ],
    },
  ],
  {
    basename: PUBLIC_URL,
  }
)

export default router
