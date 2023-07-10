import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MainPage from './components/MainPage/MainPage'
import Licences from './components/Licenses/Licenses'
import IpAssessment from './components/IpAssessment/IpAssessment'
import IdeaEvaluation from './components/IdeaEvaluation/IdeaEvaluation'

const Router = () => (
  <Routes>
    <Route path='/' element={<MainPage />}>
      <Route path='licences' element={<Licences />} />
      <Route path='ipassessment' element={<IpAssessment />} />
      <Route path='ideaevaluation' element={<IdeaEvaluation />} />
    </Route>
  </Routes>
)

export default Router
