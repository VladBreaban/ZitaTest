import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AdminDoctors } from './pages/AdminDoctors';
import { Dashboard } from './pages/Dashboard';
import { Recommendations } from './pages/Recommendations';
import { CreateRecommendation } from './pages/recommendations/CreateRecommendation';
import { Clients } from './pages/Clients';
import { Payouts } from './pages/Payouts';
import { Settings } from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDoctors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/recommendations/create" element={<CreateRecommendation />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
