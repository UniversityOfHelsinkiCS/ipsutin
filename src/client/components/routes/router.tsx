import { createBrowserRouter } from 'react-router-dom'

import App from '../../App'
import Licences from '../Licenses/Licenses'
import IpAssessment from '../IpAssessment/IpAssessment'
import IdeaEvaluation from '../IdeaEvaluation/IdeaEvaluation'

import { PUBLIC_URL } from '../../../config'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'licences',
          element: <Licences />,
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
