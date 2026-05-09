import { Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import DashboardLayout from './components/layout/DashboardLayout'
import OverviewPage from './pages/dashboard/OverviewPage'
import BorrowersPage from './pages/dashboard/BorrowersPage'
import CallsPage from './pages/dashboard/CallsPage'
import CompliancePage from './pages/dashboard/CompliancePage'
import InsightsPage from './pages/dashboard/InsightsPage'
import CaseStudiesPage from './pages/dashboard/CaseStudiesPage'
import SettingsPage from './pages/dashboard/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="borrowers" element={<BorrowersPage />} />
        <Route path="calls" element={<CallsPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
