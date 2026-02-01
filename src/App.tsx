import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { VerificationPending } from './pages/VerificationPending';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { AdminDoctors } from './pages/AdminDoctors';
import { Dashboard } from './pages/Dashboard';
import { Recommendations } from './pages/Recommendations';
import { CreateRecommendation } from './pages/recommendations/CreateRecommendation';
import { RecommendationDetails } from './pages/recommendations/RecommendationDetails';
import { Clients } from './pages/Clients';
import { ClientDetails } from './pages/ClientDetails';
import { Payouts } from './pages/Payouts';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verification-pending" element={<VerificationPending />} />
          <Route path="/admin" element={<AdminDoctors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/recommendations/create" element={<CreateRecommendation />} />
          <Route path="/recommendations/:id" element={<RecommendationDetails />} />
          <Route path="/recommendations/:id/edit" element={<CreateRecommendation />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:id" element={<ClientDetails />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
