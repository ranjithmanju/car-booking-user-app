import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 bg-gray-300 backdrop-filter backdrop-blur-lg focus:ring-gray-500 focus:border-gray-500 border rounded-md shadow-sm focus:outline-none ${className}`}
      {...props}
    />
  );
};

// appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg