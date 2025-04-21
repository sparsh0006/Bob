import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type LoadingProps = {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
};

const Loading = ({ size = 'md', color = 'primary' }: LoadingProps) => {
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
  
  const containerClasses = classNames(
    'relative',
    sizeMap[size]
  );
  
  const spinnerClasses = classNames(
    'absolute border-2 rounded-full',
    sizeMap[size],
    colorMap[color],
    'border-t-transparent'
  );
  
  const dotClasses = classNames(
    'absolute rounded-full',
    color === 'primary' ? 'bg-primary' : color === 'accent' ? 'bg-accent' : 'bg-white',
    {
      'w-1 h-1': size === 'sm',
      'w-2 h-2': size === 'md',
      'w-3 h-3': size === 'lg',
    }
  );
  
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1
  };

  return (
    <div className={containerClasses}>
      <motion.div
        className={spinnerClasses}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
      <motion.div 
        className={dotClasses}
        initial={{ x: '50%', y: 0 }}
        animate={{ 
          x: '50%', 
          y: [0, '-100%', 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Loading;