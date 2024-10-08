import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/reusable/Button';
import { useAuth } from '../../../hooks/useAuth';
import { logoutUser, changePassword } from '../../../api/auth';
import { User } from 'lucide-react';
import Logo from '../../../assets/logo.png'

const AppHeader: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleChangePassword = async () => {
    try {
      await changePassword(newPassword);
      alert('Password changed successfully');
      setShowChangePasswordModal(false);
      setNewPassword('');
    } catch (error) {
      console.error('Change password error:', error);
      alert('Failed to change password. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu(!showUserMenu);
  }, [showUserMenu]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center p-4 bg-black backdrop-filter">
      <div className="flex items-center space-x-4">
        <img src={Logo} alt="Logo" className="w-10 h-10 cursor-pointer" onClick={() => navigate('/dashboard')} />
      </div>
      <div className="flex-grow text-center"> {/* Centering the title */}
        <h1 className="text-white text-xl font-bold">Secured fleet management</h1>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <div className="relative" ref={menuRef}>
            <button
              className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all duration-300"
              onClick={toggleUserMenu}
              aria-label="Toggle user menu"
            >
              <User className="text-white" size={20} />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-gray-800 backdrop-filter backdrop-blur-lg rounded-md shadow-lg py-4 flex flex-col items-center border border-gray-700">
                <div className="px-4 py-2 text-sm text-center text-white mb-2">{user.email}</div>
                <Button 
                  onClick={() => setShowChangePasswordModal(true)} 
                  className="w-4/5 bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300 mb-2 py-2 rounded"
                >
                  Change Password
                </Button>
                <Button 
                  onClick={handleLogout} 
                  className="w-4/5 bg-red-600 hover:bg-red-700 text-white transition-all duration-300 py-2 rounded"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">Change Password</h2>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full p-2 mb-4 border rounded"
            />
            <div className="flex justify-end">
              <Button onClick={() => setShowChangePasswordModal(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleChangePassword}>
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
