import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200';
  
  const variantStyles = {
    primary: 'bg-gray-900 hover:bg-gray-800 text-white shadow-md',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400',
    gradient: 'bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 text-gray-900 font-bold hover:shadow-xl hover:scale-[1.02]',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-4 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

