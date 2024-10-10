import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useMatch } from 'react-router-dom';
import AppHeader from './layout/AppHeader';
import AppFooter from './layout/AppFooter';
import DashboardHome from './components/DashboardHome';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [slideIn, setSlideIn] = useState(false);
  const isRootPath = useMatch('/dashboard');

  useEffect(() => {
    if (!isRootPath) {
      setSlideIn(true);
    } else {
      setSlideIn(false);
    }
  }, [location, isRootPath]);

  return (
    <div className="dashboard flex flex-col min-h-screen text-black bg-gray-100">
      <AppHeader />
      <div className="flex-grow overflow-hidden">
        {isRootPath ? (
          <DashboardHome />
        ) : (
          <div className={`h-full overflow-y-auto transition-transform duration-300 ease-out ${
            slideIn ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}>
            <Outlet />
          </div>
        )}
      </div>
      <AppFooter />
    </div>
  );
};

export default Dashboard;
