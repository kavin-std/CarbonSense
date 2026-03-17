import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import FactoryDashboard from './pages/FactoryDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import CreateFactory from './pages/CreateFactory';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Factory Owner Routes */}
              <Route element={<Layout allowedRoles={['owner']} />}>
                <Route path="/factory-dashboard" element={<FactoryDashboard />} />
                <Route path="/create-factory" element={<CreateFactory />} />
              </Route>
              
              {/* Sustainability Officer Routes */}
              <Route element={<Layout allowedRoles={['officer']} />}>
                <Route path="/officer-dashboard" element={<OfficerDashboard />} />
              </Route>
            </Route>
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
