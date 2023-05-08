import React from 'react'
import { Route, Routes } from 'react-router-dom'

import IdeaEvaluation from './components/IdeaEvaluation/IdeaEvaluation'
import Licenses from './components/Licenses/Licenses'
import MainPage from './components/MainPage'
import IpAssessment from './components/IpAssessment/IpAssessment'

const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/ideaevaluation" element={<IdeaEvaluation />} />
    <Route path="/licences" element={<Licenses />} />
    <Route path="/ipassessment" element={<IpAssessment />} />
  </Routes>
)

export default Router
