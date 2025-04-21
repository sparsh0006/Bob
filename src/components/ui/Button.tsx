import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  size = 'md',
  className,
}: ButtonProps) => {
  const baseClasses = "rounded-lg font-medium transition-all duration-300 flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-primary hover:bg-primary-dark text-white shadow-md hover:shadow-lg",
    secondary: "bg-secondary hover:bg-secondary-dark text-white border border-gray-700",
    glass: "glass-button text-white",
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };
  
  const disabledClasses = "opacity-60 cursor-not-allowed";
  
  const buttonClasses = classNames(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled ? disabledClasses : "",
    className
  );
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default Button;