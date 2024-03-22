import { createBrowserRouter } from 'react-router-dom'

import { PUBLIC_URL } from '../../../config'
import App from '../../App'
import IdeaEvaluation from '../../pages/IdeaEvaluation/IdeaEvaluation'
import IdeaEvaluationResults from '../../pages/IdeaEvaluation/IdeaEvaluationResults'
import InventionDisclosurePage from '../../pages/InventionDisclosure'
import IpAssessment from '../../pages/IpAssessment/IpAssessment'
import IpAssessmentResults from '../../pages/IpAssessment/IpAssessmentResults'
import LicenceResults from '../../pages/Licences/LicenceResults'
import Licences from '../../pages/Licences/Licences'
import MainPage from '../../pages/MainPage/MainPage'
import Admin from '../Admin/Admin'
import RenderAnalytics from '../Admin/Analytics/RenderAnalytics'
import Entry from '../Admin/Entries/Entry'
import RenderEntries from '../Admin/Entries/RenderEntries'

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
        {
          path: '/inventiondisclosure',
          element: <InventionDisclosurePage />,
        },
      ],
    },
  ],
  {
    basename: PUBLIC_URL,
  }
)

export default router
