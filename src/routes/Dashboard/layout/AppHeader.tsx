import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/reusable/Button'; // Adjusted import
import { Input } from '../../../components/reusable/Input'; // Adjusted import
import { useAuth } from '../../../hooks/useAuth';
import { logoutUser, changePassword } from '../../../api/auth';
import { User, Eye, EyeOff } from 'lucide-react'; // Add Eye/EyeOff icon imports
import Logo from '../../../assets/STAMP-logo-home.png';

const AppHeader: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [previousPassword, setPreviousPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  
  // States for password visibility
  const [showPreviousPassword, setShowPreviousPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleChangePassword = async () => {
    if (!previousPassword || !newPassword || !confirmPassword) {
      setPasswordError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      await changePassword(previousPassword, newPassword);
      alert('Password changed successfully');
      setShowChangePasswordModal(false);
      setPreviousPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError(false);
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center p-4 bg-opacity-10 bg-white backdrop-filter backdrop-blur-lg border border-white shadow-lg border-opacity-20 transition-all duration-500 ease-in-out">
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-full h-10 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          />
        </div>
        <div className="flex-grow text-center">
          <h1 className="text-black text-2xl font-bold">Secured Fleet Management</h1>
        </div>
        <div className="flex items-center space-x-4 relative">
          {user && (
            <>
              <button
                className="w-10 h-10 rounded-full bg-gray-600 bg-opacity-20 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all duration-300"
                onClick={toggleUserMenu}
                aria-label="Toggle user menu"
              >
                <User className="text-white" size={20} />
              </button>

              {showUserMenu && (
                <div
                  className="absolute top-14 right-0 w-72 rounded-md shadow-lg py-4 flex flex-col items-center bg-white backdrop-filter backdrop-blur-lg border border-white border-opacity-20 transition-all duration-500 ease-in-out"
                  style={{
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"  // Equal shadow in all directions
                  }}
                  ref={menuRef}
                >
                  <div className="px-4 py-2 text-sm text-center text-black mb-2">
                    {user?.email}
                  </div>
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
            </>
          )}
        </div>
      </header>

      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Change Password</h2>

            {/* Previous Password Input */}
            <div className="relative mb-4">
              <Input
                type={showPreviousPassword ? "text" : "password"}
                value={previousPassword}
                onChange={(e) => {
                  setPreviousPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Previous Password"
                className={`w-full p-2 border rounded ${passwordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPreviousPassword(!showPreviousPassword)}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showPreviousPassword ? <EyeOff className='text-gray-600' size={20} /> : <Eye className='text-gray-600' size={20} />}
              </button>
            </div>

            {/* New Password Input */}
            <div className="relative mb-4">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="New Password"
                className={`w-full p-2 border rounded ${passwordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showNewPassword ? <EyeOff className='text-gray-600' size={20} /> : <Eye className='text-gray-600' size={20} />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative mb-4">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError(false);
                }}
                placeholder="Confirm New Password"
                className={`w-full p-2 border rounded ${passwordError ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showConfirmPassword ? <EyeOff className='text-gray-600' size={20} /> : <Eye className='text-gray-600' size={20} />}
              </button>
            </div>

            {passwordError && (
              <p className="text-red-500">Please fill out all fields correctly.</p>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => setShowChangePasswordModal(false)}
                className="mr-2 bg-gray-500"
              >
                Cancel
              </Button>
              <Button className='bg-gray-500' onClick={handleChangePassword}>Change Password</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;
