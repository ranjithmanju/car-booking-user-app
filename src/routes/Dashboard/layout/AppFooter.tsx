import React from 'react';

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* First div centered */}
        <div className="flex-grow text-center">
          <p className='text-sm'>&copy; {currentYear} Security India</p>
        </div>
        {/* Second div aligned to the right */}
        <div className="ml-auto text-right">
          <p className='text-sm'>Powered by Waveze</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
