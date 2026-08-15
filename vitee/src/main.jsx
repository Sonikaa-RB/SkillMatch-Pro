import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './SignupPage.jsx'
import ProfileSetupPage from './pages/ProfileSetupPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'
import JobRecommendationsPage from './pages/JobRecommendationsPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile-setup" element={<ProfileSetupPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/jobs" element={<JobRecommendationsPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)