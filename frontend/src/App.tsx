import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import MainLayout from './layouts/MainLayout';
import RemittanceApp from './pages/Dashboard/RemittanceApp';
import Activity from './pages/Dashboard/Activity';
import Assets from './pages/Dashboard/Assets';
import Profile from './pages/Dashboard/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main Dashboard Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<RemittanceApp />} />
          <Route path="activity" element={<Activity />} />
          <Route path="assets" element={<Assets />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
