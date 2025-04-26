import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
  text?: string;
};

const Loading = ({ size = 'md', color = 'primary', text }: LoadingProps) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };
  
  const colorMap = {
    primary: 'border-primary-light',
    accent: 'border-accent',
    white: 'border-white',
  };
  
  const spinnerClasses = classNames(
    'rounded-full border-2 animate-spin',
    sizeMap[size],
    colorMap[color],
    'border-t-transparent'
  );
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={spinnerClasses}></div>
      {text && (
        <p className="mt-2 text-sm text-gray-300">{text}</p>
      )}
    </div>
  );
};

export default Loading;