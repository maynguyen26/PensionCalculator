import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import EmployeeDashboard from './pages/EmployeeDashboard.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <PrivateRoute><EmployeeDashboard /></PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute><AdminDashboard /></PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)