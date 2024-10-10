import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
}

export const Alert: React.FC<AlertProps> = ({ 
  children, 
  className = '', 
  variant = 'default', 
  ...props 
}) => {
  const baseStyles = 'p-4 rounded-md';
  const variantStyles = variant === 'destructive' 
    ? 'text-red-700' 
    : 'bg-blue-100 border border-blue-400 text-blue-700';

  return (
    <div className={`${variantStyles} ${className}`} role="alert" {...props}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <p className={`text-sm ${className}`} {...props}>
      {children}
    </p>
  );
};
