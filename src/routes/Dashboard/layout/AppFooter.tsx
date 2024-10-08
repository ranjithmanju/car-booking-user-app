import React from 'react';

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {currentYear} STAMP. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
