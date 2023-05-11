import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainPage from './components/MainPage/MainPage'

const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/ideaevaluation" element={<MainPage />} />
    <Route path="/licences" element={<MainPage />} />
    <Route path="/ipassessment" element={<MainPage />} />
  </Routes>
)

export default Router
