import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard/index';
import SecuredVehiclesList from './routes/Dashboard/components/DashboardHome/SecuredVehicles/SecuredVehiclesList';
import UnSecuredVehiclesList from './routes/Dashboard/components/DashboardHome/UnSecuredVehicles/UnSecuredVehicleList';
import SecuredCapacity from './routes/Dashboard/components/DashboardHome/SecuredVehicles/Capacity';
import SecuredDetails from './routes/Dashboard/components/DashboardHome/SecuredVehicles/Details';
import SecuredConfirm from './routes/Dashboard/components/DashboardHome/SecuredVehicles/Confirm';
import UnSecuredCapacity from './routes/Dashboard/components/DashboardHome/UnSecuredVehicles/Capacity';
import UnSecuredDetails from './routes/Dashboard/components/DashboardHome/UnSecuredVehicles/Details';
import UnSecuredConfirm from './routes/Dashboard/components/DashboardHome/UnSecuredVehicles/Confirm';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="secured-vehicles" element={<SecuredVehiclesList />} />
            <Route path="unsecured-vehicles" element={<UnSecuredVehiclesList />} />
            <Route path="secured-vehicles/capacity" element={<SecuredCapacity />} />
            <Route path="secured-vehicles/details" element={<SecuredDetails />} />
            <Route path="secured-vehicles/confirm" element={<SecuredConfirm />} />
            <Route path="unsecured-vehicles/capacity" element={<UnSecuredCapacity />} />
            <Route path="unsecured-vehicles/details" element={<UnSecuredDetails />} />
            <Route path="unsecured-vehicles/confirm" element={<UnSecuredConfirm />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
